import dotenv from 'dotenv';
dotenv.config({ override: true });
import express from 'express';
import cookieParser from 'cookie-parser';
import { apiRouter } from '../src/server/routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Support both /api/... (direct) and /... (if path prefix is stripped during rewrites)
app.use('/api', apiRouter);
app.use('/', apiRouter);

// Fallback 404 handler for API routes to guarantee JSON output
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: 'API endpoint not found',
  });
});

export default app;
