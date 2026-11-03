import { Router, Response } from 'express';
import { AnalysisModel } from '../models/Analysis.js';
import { ResumeModel } from '../models/Resume.js';
import { analyzeResumeWithAI } from '../services/gemini.js';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';
import { normalizeAnalysis } from '../services/normalize.js';

const router = Router();

// Create new analysis
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { resumeId, resumeText, targetRole } = req.body;

    if (!targetRole || (!resumeId && !resumeText)) {
      res.status(400).json({ error: 'Target role and resume content are required.' });
      return;
    }

    let rawResumeText = resumeText;
    let fileName = 'Direct Resume Input';

    if (resumeId) {
      let resume = await ResumeModel.findById(resumeId);
      if (!resume) {
        // Fallback: search user's uploaded resumes if exact ID mismatch
        const userResumes = await ResumeModel.find({ userId: req.user.userId });
        if (userResumes && userResumes.length > 0) {
          resume = userResumes[userResumes.length - 1];
        }
      }
      if (resume) {
        rawResumeText = resume.rawText;
        fileName = resume.fileName;
      } else if (!rawResumeText) {
        res.status(404).json({ error: 'Resume document not found. Please re-upload your resume.' });
        return;
      }
    }

    if (!rawResumeText || rawResumeText.trim().length < 20) {
      res.status(400).json({ error: 'Resume content is empty or invalid.' });
      return;
    }

    // Call Gemini AI analysis pipeline
    const aiResult = await analyzeResumeWithAI(rawResumeText, targetRole);

    const analysisDoc = await AnalysisModel.create({
      userId: req.user.userId,
      resumeId: resumeId || 'pasted_' + Date.now(),
      resumeFileName: fileName,
      targetRole: targetRole.trim(),
      rawText: rawResumeText,
      overallScore: aiResult.overallScore || 70,
      overallScoreExplanation: aiResult.overallScoreExplanation || '',
      atsScore: aiResult.atsScore || 70,
      atsRiskLevel: aiResult.atsRiskLevel || 'Moderate Risk',
      atsBreakdown: aiResult.atsBreakdown || {},
      skillAnalysis: aiResult.skillAnalysis || {},
      projectAnalysis: aiResult.projectAnalysis || {},
      experienceAnalysis: aiResult.experienceAnalysis || {},
      xaiExplanations: aiResult.xaiExplanations || {},
      roadmapStages: aiResult.roadmapStages || [],
      courseRecommendations: aiResult.courseRecommendations || [],
      createdAt: new Date()
    });

    const normalizedDoc = normalizeAnalysis(analysisDoc);

    res.status(201).json({
      message: 'Analysis completed successfully',
      analysis: normalizedDoc
    });
  } catch (err: any) {
    console.error('Error creating analysis:', err);
    res.status(500).json({ error: 'Failed to complete resume analysis.' });
  }
});

// List all analyses for current user
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const analyses = await AnalysisModel.find({ userId: req.user.userId });
    const normalizedAnalyses = await Promise.all(analyses.map(async (a: any) => {
      const doc = typeof a.toObject === 'function' ? a.toObject() : { ...a };
      if (!doc.rawText && doc.resumeId) {
        const resume = await ResumeModel.findById(doc.resumeId);
        if (resume) doc.rawText = resume.rawText;
      }
      return normalizeAnalysis(doc);
    }));
    res.json({ analyses: normalizedAnalyses });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch analysis history.' });
  }
});

// Get specific analysis by ID
router.get('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const analysis = await AnalysisModel.findById(req.params.id);
    if (!analysis || analysis.userId !== req.user.userId) {
      res.status(404).json({ error: 'Analysis not found' });
      return;
    }

    const doc = typeof analysis.toObject === 'function' ? analysis.toObject() : { ...analysis };
    if (!doc.rawText && doc.resumeId) {
      const resume = await ResumeModel.findById(doc.resumeId);
      if (resume) doc.rawText = resume.rawText;
    }

    const normalized = normalizeAnalysis(doc);
    res.json({ analysis: normalized });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch analysis details.' });
  }
});

// Sub-endpoints for individual breakdown screens
router.get('/:id/ats', authMiddleware, async (req: AuthRequest, res: Response) => {
  const analysis = await AnalysisModel.findById(req.params.id);
  if (!analysis || analysis.userId !== req.user?.userId) {
    res.status(404).json({ error: 'Analysis not found' });
    return;
  }
  const normalized = normalizeAnalysis(analysis);
  res.json({
    targetRole: normalized.targetRole,
    atsScore: normalized.atsScore,
    atsRiskLevel: normalized.atsRiskLevel,
    atsBreakdown: normalized.atsBreakdown,
    xaiExplanations: normalized.xaiExplanations
  });
});

router.get('/:id/skills', authMiddleware, async (req: AuthRequest, res: Response) => {
  const analysis = await AnalysisModel.findById(req.params.id);
  if (!analysis || analysis.userId !== req.user?.userId) {
    res.status(404).json({ error: 'Analysis not found' });
    return;
  }
  const normalized = normalizeAnalysis(analysis);
  res.json({
    targetRole: normalized.targetRole,
    skillAnalysis: normalized.skillAnalysis
  });
});

router.get('/:id/projects', authMiddleware, async (req: AuthRequest, res: Response) => {
  const analysis = await AnalysisModel.findById(req.params.id);
  if (!analysis || analysis.userId !== req.user?.userId) {
    res.status(404).json({ error: 'Analysis not found' });
    return;
  }
  const normalized = normalizeAnalysis(analysis);
  res.json({
    targetRole: normalized.targetRole,
    projectAnalysis: normalized.projectAnalysis
  });
});

router.get('/:id/experience', authMiddleware, async (req: AuthRequest, res: Response) => {
  const analysis = await AnalysisModel.findById(req.params.id);
  if (!analysis || analysis.userId !== req.user?.userId) {
    res.status(404).json({ error: 'Analysis not found' });
    return;
  }
  const normalized = normalizeAnalysis(analysis);
  res.json({
    targetRole: normalized.targetRole,
    experienceAnalysis: normalized.experienceAnalysis
  });
});

router.get('/:id/roadmap', authMiddleware, async (req: AuthRequest, res: Response) => {
  const analysis = await AnalysisModel.findById(req.params.id);
  if (!analysis || analysis.userId !== req.user?.userId) {
    res.status(404).json({ error: 'Analysis not found' });
    return;
  }
  const normalized = normalizeAnalysis(analysis);
  res.json({
    targetRole: normalized.targetRole,
    roadmapStages: normalized.roadmapStages
  });
});

router.get('/:id/courses', authMiddleware, async (req: AuthRequest, res: Response) => {
  const analysis = await AnalysisModel.findById(req.params.id);
  if (!analysis || analysis.userId !== req.user?.userId) {
    res.status(404).json({ error: 'Analysis not found' });
    return;
  }
  const normalized = normalizeAnalysis(analysis);
  res.json({
    targetRole: normalized.targetRole,
    courseRecommendations: normalized.courseRecommendations
  });
});

// Delete analysis
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const success = await AnalysisModel.findByIdAndDelete(req.params.id);
    res.json({ success, message: 'Analysis deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete analysis' });
  }
});

export default router;
