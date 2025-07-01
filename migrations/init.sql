CREATE TABLE if not exists rr_images (
  id INTEGER PRIMARY KEY,
  room TEXT,
  r2_key TEXT NOT NULL,
  r2_url TEXT NOT NULL,
  isBento BOOL DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE if not exists dalle_creations (
  id INTEGER PRIMARY KEY,
  room TEXT,
  prompt TEXT,
  start_key TEXT
  r2_key TEXT NOT NULL,
  r2_url TEXT NOT NULL,
  revision INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE if not exists staging_edits (
  id INTEGER PRIMARY KEY,
  start_key TEXT,
  start_url TEXT,
  prompt TEXT,
  status TEXT DEFAULT 'pending',
  created_at DATETIME DEFAULT  CURRENT_TIMESTAM
);