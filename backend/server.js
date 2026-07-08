import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { rsvpRouter } from './routes/rsvp.js';
import { uploadRouter } from './routes/upload.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/rsvp', rsvpRouter);
app.use('/api/upload', uploadRouter);

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
