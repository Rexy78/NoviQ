import { Router, Response } from 'express';
import { improveResumeText } from '../services/gemini.js';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';

const router = Router();

router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { originalText, targetRole, sectionType } = req.body;
    if (!originalText || !targetRole) {
      res.status(400).json({ error: 'originalText and targetRole are required' });
      return;
    }

    const result = await improveResumeText(originalText, targetRole, sectionType || 'bullet point');
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to enhance text snippet with AI' });
  }
});

export default router;
