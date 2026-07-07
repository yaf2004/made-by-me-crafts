import express from 'express';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database(path.join(__dirname, '../db.sqlite'));

// Create RSVP table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS rsvps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    selected_package TEXT NOT NULL,
    number_of_seats INTEGER DEFAULT 1,
    include_refreshments INTEGER DEFAULT 0,
    pay_activity_in_person INTEGER DEFAULT 0,
    payment_method TEXT DEFAULT 'link',
    payment_link TEXT,
    payment_screenshot_url TEXT,
    message TEXT,
    status TEXT DEFAULT 'pending',
    created_at TEXT DEFAULT (datetime('now'))
  )
`);

export const rsvpRouter = express.Router();

// POST /api/rsvp — create a new RSVP
rsvpRouter.post('/', (req, res) => {
  const {
    full_name,
    email,
    phone,
    selected_package,
    number_of_seats,
    include_refreshments,
    pay_activity_in_person,
    payment_method,
    payment_link,
    payment_screenshot_url,
    message,
  } = req.body;

  if (!full_name || !email || !selected_package) {
    return res.status(400).json({ message: 'full_name, email, and selected_package are required.' });
  }

  const stmt = db.prepare(`
    INSERT INTO rsvps (
      full_name, email, phone, selected_package, number_of_seats,
      include_refreshments, pay_activity_in_person, payment_method,
      payment_link, payment_screenshot_url, message
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    full_name, email, phone || null, selected_package,
    number_of_seats || 1,
    include_refreshments ? 1 : 0,
    pay_activity_in_person ? 1 : 0,
    payment_method || 'link',
    payment_link || null,
    payment_screenshot_url || null,
    message || null
  );

  return res.status(201).json({ id: result.lastInsertRowid, status: 'pending' });
});

// GET /api/rsvp — list all RSVPs (admin use)
rsvpRouter.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM rsvps ORDER BY created_at DESC').all();
  res.json(rows);
});

// PATCH /api/rsvp/:id/status — update RSVP status (admin use)
rsvpRouter.patch('/:id/status', (req, res) => {
  const { status } = req.body;
  const allowed = ['pending', 'confirmed', 'declined'];
  if (!allowed.includes(status)) {
    return res.status(400).json({ message: 'Invalid status.' });
  }
  db.prepare('UPDATE rsvps SET status = ? WHERE id = ?').run(status, req.params.id);
  res.json({ success: true });
});
