import { Router, Response } from 'express';
import { ChatModel } from '../models/Chat.js';
import { AnalysisModel } from '../models/Analysis.js';
import { ResumeModel } from '../models/Resume.js';
import { chatWithAI } from '../services/gemini.js';
import { normalizeAnalysis } from '../services/normalize.js';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';

const router = Router();

// Get chat history for current user & optional active analysis
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { analysisId } = req.query;
    let chat;
    if (analysisId) {
      chat = await ChatModel.findOne({ userId: req.user.userId, analysisId: String(analysisId) });
    } else {
      const chats = await ChatModel.find({ userId: req.user.userId });
      chat = chats[0];
    }

    res.json({
      chatId: chat?._id || chat?.id || null,
      messages: chat?.messages || []
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
});

// Post message to CareerAI chatbot
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { message, analysisId } = req.body;
    if (!message || !message.trim()) {
      res.status(400).json({ error: 'Message content is required' });
      return;
    }

    let activeAnalysis: any = null;
    let rawResumeText = '';

    if (analysisId) {
      activeAnalysis = await AnalysisModel.findById(analysisId);
      if (activeAnalysis) activeAnalysis = normalizeAnalysis(activeAnalysis);
      if (activeAnalysis && activeAnalysis.resumeId) {
        const resume = await ResumeModel.findById(activeAnalysis.resumeId);
        if (resume) rawResumeText = resume.rawText;
      }
    } else {
      const recentAnalyses = await AnalysisModel.find({ userId: req.user.userId });
      if (recentAnalyses.length > 0) {
        activeAnalysis = normalizeAnalysis(recentAnalyses[0]);
        const resume = await ResumeModel.findById(activeAnalysis.resumeId);
        if (resume) rawResumeText = resume.rawText;
      }
    }

    // Retrieve or create Chat session
    let chat = analysisId
      ? await ChatModel.findOne({ userId: req.user.userId, analysisId: String(analysisId) })
      : (await ChatModel.find({ userId: req.user.userId }))[0];

    const userMsg = { sender: 'user' as const, text: message.trim(), timestamp: new Date() };

    let messages = chat ? [...chat.messages, userMsg] : [userMsg];

    // Call Gemini AI
    const aiAnswer = await chatWithAI(messages, rawResumeText, activeAnalysis, message.trim());
    const assistantMsg = { sender: 'assistant' as const, text: aiAnswer, timestamp: new Date() };

    messages.push(assistantMsg);

    const chatId = String((chat as any)?._id || chat?.id || '');

    if (chat && chatId) {
      await ChatModel.findByIdAndUpdate(chatId, {
        messages,
        updatedAt: new Date()
      });
    } else {
      const targetAnalysisId = analysisId ? String(analysisId) : String((activeAnalysis as any)?._id || activeAnalysis?.id || '');
      chat = await ChatModel.create({
        userId: req.user.userId,
        analysisId: targetAnalysisId || undefined,
        messages,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    res.json({
      answer: aiAnswer,
      messages
    });
  } catch (err: any) {
    console.error('Chat API error:', err);
    res.status(500).json({ error: 'Failed to process chat message.' });
  }
});

export default router;
