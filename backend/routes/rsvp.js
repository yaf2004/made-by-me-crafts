import express from 'express';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database(path.join(__dirname, '../db.sqlite'));

db.exec(`
  CREATE TABLE IF NOT EXISTS rsvps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    selected_package TEXT NOT NULL,
    number_of_seats INTEGER DEFAULT 1,
    guest_names TEXT,
    payment_method TEXT DEFAULT 'screenshot',
    payment_link TEXT,
    payment_screenshot_url TEXT,
    message TEXT,
    status TEXT DEFAULT 'pending',
    created_at TEXT DEFAULT (datetime('now'))
  )
`);

const ADMIN_PASSWORDS = [process.env.ADMIN_PASSWORD, process.env.VITE_ADMIN_PASSWORD, 'madebyme2025']
  .filter(Boolean)
  .map((value) => value.trim().toLowerCase());

const getAdminPassword = (req) => {
  const fromQuery = req.query?.password;
  const fromBody = req.body?.password;
  const fromHeader = req.headers['x-admin-password'];
  return [fromQuery, fromBody, fromHeader].find((value) => typeof value === 'string' && value.trim())?.trim();
};

const isValidAdminPassword = (value) => {
  if (typeof value !== 'string') return false;
  const normalized = value.trim().toLowerCase();
  return ADMIN_PASSWORDS.includes(normalized);
};

export const rsvpRouter = express.Router();

// POST /api/rsvp
rsvpRouter.post('/', (req, res) => {
  const { full_name, email, phone, selected_package, number_of_seats, guest_names, payment_method, payment_link, payment_screenshot_url, message } = req.body;
  if (!full_name || !email || !selected_package) {
    return res.status(400).json({ message: 'full_name, email, and selected_package are required.' });
  }
  const result = db.prepare(`
    INSERT INTO rsvps (full_name, email, phone, selected_package, number_of_seats, guest_names, payment_method, payment_link, payment_screenshot_url, message)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(full_name, email, phone || null, selected_package, number_of_seats || 1, guest_names || full_name, payment_method || 'screenshot', payment_link || null, payment_screenshot_url || null, message || null);
  return res.status(201).json({ id: result.lastInsertRowid, status: 'pending' });
});

// GET /api/rsvp?password=xxx
rsvpRouter.get('/', (req, res) => {
  if (!isValidAdminPassword(getAdminPassword(req))) return res.status(401).json({ message: 'Unauthorized' });
  const rows = db.prepare('SELECT * FROM rsvps ORDER BY created_at DESC').all();
  res.json(rows);
});

// PATCH /api/rsvp/:id/status?password=xxx
rsvpRouter.patch('/:id/status', (req, res) => {
  if (!isValidAdminPassword(getAdminPassword(req))) return res.status(401).json({ message: 'Unauthorized' });
  const { status } = req.body;
  if (!['pending', 'confirmed', 'declined'].includes(status)) return res.status(400).json({ message: 'Invalid status.' });
  db.prepare('UPDATE rsvps SET status = ? WHERE id = ?').run(status, req.params.id);
  res.json({ success: true });
});
