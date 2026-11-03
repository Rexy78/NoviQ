import { Router, Response } from 'express';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/User.js';
import { generateToken, authMiddleware, AuthRequest } from '../middleware/auth.js';

const router = Router();

// Register
router.post('/register', async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, password, profileRole } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ error: 'Name, email, and password are required.' });
      return;
    }

    const existingUser = await UserModel.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      res.status(400).json({ error: 'An account with this email already exists.' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
      profileRole: profileRole || 'Software Engineer',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const token = generateToken({
      userId: String((user as any)._id || user.id || ''),
      email: user.email,
      name: user.name
    });

    res.cookie('token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });

    res.status(201).json({
      message: 'Account created successfully',
      token,
      user: {
        id: String((user as any)._id || user.id || ''),
        name: user.name,
        email: user.email,
        profileRole: user.profileRole
      }
    });
  } catch (err: any) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Server error during registration.' });
  }
});

// Login
router.post('/login', async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required.' });
      return;
    }

    const user = await UserModel.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      res.status(401).json({ error: 'Invalid email or password.' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid email or password.' });
      return;
    }

    const token = generateToken({
      userId: String((user as any)._id || user.id || ''),
      email: user.email,
      name: user.name
    });

    res.cookie('token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });

    res.json({
      message: 'Logged in successfully',
      token,
      user: {
        id: String((user as any)._id || user.id || ''),
        name: user.name,
        email: user.email,
        profileRole: user.profileRole
      }
    });
  } catch (err: any) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login.' });
  }
});

// Current User Profile
router.get('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }
    const user = await UserModel.findById(req.user.userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({
      user: {
        id: String((user as any)._id || user.id || ''),
        name: user.name,
        email: user.email,
        profileRole: user.profileRole,
        createdAt: user.createdAt
      }
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Error fetching profile' });
  }
});

// Update Profile
router.put('/profile', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }
    const { name, profileRole } = req.body;
    const updated = await UserModel.findByIdAndUpdate(req.user.userId, {
      ...(name && { name }),
      ...(profileRole && { profileRole }),
      updatedAt: new Date()
    });

    res.json({
      message: 'Profile updated',
      user: {
        id: String((updated as any)?._id || updated?.id || ''),
        name: updated?.name,
        email: updated?.email,
        profileRole: updated?.profileRole
      }
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Error updating profile' });
  }
});

// Purge all user accounts, credentials, resumes, and analyses
router.post('/purge-all', async (_req: AuthRequest, res: Response) => {
  try {
    const { memoryStore } = await import('../db.js');
    memoryStore.clearAll();

    try {
      await UserModel.deleteMany({});
    } catch (e) {
      console.warn('MongoDB UserModel cleanup warning:', e);
    }

    res.clearCookie('token');
    res.json({ message: 'All user accounts, credentials, resumes, and analyses have been completely removed.' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to purge data store' });
  }
});

export default router;
