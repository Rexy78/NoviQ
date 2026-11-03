import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { connectDB } from './server/db.js';
import authRoutes from './server/routes/auth.js';
import resumeRoutes from './server/routes/resumes.js';
import analysisRoutes from './server/routes/analyses.js';
import improveRoutes from './server/routes/improve.js';
import chatRoutes from './server/routes/chat.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize DB
  await connectDB();

  // Middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Helper cookie parser middleware
  app.use((req: any, _res, next) => {
    req.cookies = {};
    const cookieHeader = req.headers.cookie;
    if (cookieHeader) {
      cookieHeader.split(';').forEach((cookie: string) => {
        const parts = cookie.split('=');
        req.cookies[parts[0].trim()] = (parts[1] || '').trim();
      });
    }
    next();
  });

  // REST API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/resumes', resumeRoutes);
  app.use('/api/analyses', analysisRoutes);
  app.use('/api/improve', improveRoutes);
  app.use('/api/chat', chatRoutes);

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'Career Nova API' });
  });

  // Catch unmatched API routes and return JSON 404
  app.all('/api/*', (_req, res) => {
    res.status(404).json({ error: 'API endpoint not found' });
  });

  // Global error handler middleware for Express
  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('Unhandled server error:', err);
    res.status(err.status || 500).json({
      error: err.message || 'An internal server error occurred.'
    });
  });

  // Vite development middleware or production static server
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 AI Career Intelligence Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start application server:', err);
});
