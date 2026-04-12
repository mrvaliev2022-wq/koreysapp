-- KoreysApp v2.0 — Database Schema
-- Run: psql $DATABASE_URL -f schema.sql

-- Users
CREATE TABLE IF NOT EXISTS users (
  id          SERIAL PRIMARY KEY,
  telegram_id BIGINT UNIQUE NOT NULL,
  name        VARCHAR(255) NOT NULL,
  username    VARCHAR(255),
  is_premium  BOOLEAN DEFAULT false,
  premium_until TIMESTAMPTZ,
  referral_code VARCHAR(20) UNIQUE,
  referred_by INT REFERENCES users(id),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Lessons
CREATE TABLE IF NOT EXISTS lessons (
  id          SERIAL PRIMARY KEY,
  track       VARCHAR(20) NOT NULL CHECK (track IN ('TOPIK', 'EPS-TOPIK')),
  level       SMALLINT NOT NULL,        -- 1-based order
  title_kr    VARCHAR(255) NOT NULL,    -- Korean title
  title_uz    VARCHAR(255) NOT NULL,    -- Uzbek title
  content     JSONB NOT NULL,           -- full lesson content (see structure below)
  audio_urls  JSONB DEFAULT '{}',       -- {type: url, ...}
  is_free     BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- content JSONB structure:
-- {
--   topic: { kr: "", uz: "" },
--   grammar: { explanation: "", examples: [{kr:"",uz:""}] },
--   vocabulary: [{kr:"",romanization:"",uz:""}],
--   examples: [{kr:"",uz:""}],
--   dialog: [{speaker:"A",kr:"",uz:""}],
--   notes: [""],
-- }

-- Quiz questions (for step 9 test)
CREATE TABLE IF NOT EXISTS quiz_questions (
  id            SERIAL PRIMARY KEY,
  lesson_id     INT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  question      TEXT NOT NULL,
  options       JSONB NOT NULL,           -- ["opt1","opt2","opt3","opt4"]
  correct_index SMALLINT NOT NULL,        -- 0-based
  question_type VARCHAR(30) DEFAULT 'multiple_choice'
);

-- User progress per lesson
CREATE TABLE IF NOT EXISTS user_progress (
  id          SERIAL PRIMARY KEY,
  user_id     INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id   INT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  status      VARCHAR(20) DEFAULT 'locked' CHECK (status IN ('locked','unlocked','in_progress','completed')),
  score       SMALLINT,                   -- last test score 0-100
  attempts    SMALLINT DEFAULT 0,
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, lesson_id)
);

-- User stats (XP, streak, level)
CREATE TABLE IF NOT EXISTS user_stats (
  user_id         INT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  xp              INT DEFAULT 0,
  streak          SMALLINT DEFAULT 0,
  freeze_days     SMALLINT DEFAULT 0,
  level           SMALLINT DEFAULT 1,
  lessons_done    SMALLINT DEFAULT 0,
  last_study_date DATE
);

-- Leaderboard (daily reset + global)
CREATE TABLE IF NOT EXISTS leaderboard (
  user_id    INT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  xp_today   INT DEFAULT 0,
  xp_total   INT DEFAULT 0,
  rank_today INT,
  rank_global INT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments
CREATE TABLE IF NOT EXISTS payments (
  id           SERIAL PRIMARY KEY,
  user_id      INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  method       VARCHAR(30) NOT NULL CHECK (method IN ('stars','card','referral')),
  amount       INT,                       -- stars count or tiyin amount
  status       VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','confirmed','failed')),
  tx_id        VARCHAR(255),
  confirmed_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Badges
CREATE TABLE IF NOT EXISTS badges (
  id         SERIAL PRIMARY KEY,
  user_id    INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  badge_type VARCHAR(50) NOT NULL,
  earned_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, badge_type)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_progress_user ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_leaderboard_xp_today ON leaderboard(xp_today DESC);
CREATE INDEX IF NOT EXISTS idx_leaderboard_xp_total ON leaderboard(xp_total DESC);
CREATE INDEX IF NOT EXISTS idx_lessons_track_level ON lessons(track, level);

-- Seed: unlock first lesson for new users (trigger)
CREATE OR REPLACE FUNCTION unlock_first_lesson()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_progress (user_id, lesson_id, status)
  SELECT NEW.id, id, 'unlocked'
  FROM lessons WHERE level = 1 AND is_free = true
  ON CONFLICT DO NOTHING;

  INSERT INTO user_stats (user_id) VALUES (NEW.id)
  ON CONFLICT DO NOTHING;

  INSERT INTO leaderboard (user_id) VALUES (NEW.id)
  ON CONFLICT DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_user_create ON users;
CREATE TRIGGER on_user_create
  AFTER INSERT ON users
  FOR EACH ROW EXECUTE FUNCTION unlock_first_lesson();
