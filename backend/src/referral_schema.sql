-- Referral tizimi uchun yangi jadvallar
-- backend/src/referral_schema.sql

CREATE TABLE IF NOT EXISTS referrals (
  id                    SERIAL PRIMARY KEY,
  referrer_telegram_id  BIGINT NOT NULL,
  referred_telegram_id  BIGINT NOT NULL,
  status                VARCHAR(20) DEFAULT 'pending',
  created_at            TIMESTAMP DEFAULT NOW(),
  confirmed_at          TIMESTAMP,
  UNIQUE(referrer_telegram_id, referred_telegram_id)
);

CREATE TABLE IF NOT EXISTS referral_rewards (
  id                    SERIAL PRIMARY KEY,
  referrer_telegram_id  BIGINT NOT NULL UNIQUE,
  given_at              TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON referrals(referrer_telegram_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referred ON referrals(referred_telegram_id);
CREATE INDEX IF NOT EXISTS idx_referrals_status   ON referrals(status);
