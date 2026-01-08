-- =====================================================
-- EcoVibe v2 - Migration: Add Real Data Tables
-- Run this if you already have the campaigns table
-- =====================================================

-- 1. User Profiles Table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT UNIQUE NOT NULL,
  email TEXT,
  username TEXT,
  total_earnings DECIMAL DEFAULT 0,
  pending_rewards DECIMAL DEFAULT 0,
  trash_removed_kg DECIMAL DEFAULT 0,
  co2_offset_kg DECIMAL DEFAULT 0,
  total_cleanups INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Activity History Table
CREATE TABLE IF NOT EXISTS activity_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_address TEXT NOT NULL,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL,
  impact_kg DECIMAL DEFAULT 0,
  reward_amount DECIMAL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Badges Table
CREATE TABLE IF NOT EXISTS badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  rarity TEXT DEFAULT 'common',
  requirement_type TEXT,
  requirement_value INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. User Badges Table
CREATE TABLE IF NOT EXISTS user_badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_address TEXT NOT NULL,
  badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_address, badge_id)
);

-- 5. Campaign Participations Table
CREATE TABLE IF NOT EXISTS campaign_participations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  user_address TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  proof_url TEXT,
  verified_at TIMESTAMP WITH TIME ZONE,
  reward_claimed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(campaign_id, user_address)
);

-- =====================================================
-- Indexes
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_user_profiles_wallet ON user_profiles(wallet_address);
CREATE INDEX IF NOT EXISTS idx_activity_user ON activity_history(user_address);
CREATE INDEX IF NOT EXISTS idx_activity_created ON activity_history(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_participations_user ON campaign_participations(user_address);
CREATE INDEX IF NOT EXISTS idx_participations_campaign ON campaign_participations(campaign_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_user ON user_badges(user_address);

-- =====================================================
-- Row Level Security
-- =====================================================

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_participations ENABLE ROW LEVEL SECURITY;

-- User Profiles Policies (drop first if exists to avoid conflicts)
DROP POLICY IF EXISTS "Users can view all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;

CREATE POLICY "Users can view all profiles" ON user_profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON user_profiles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (true);

-- Activity History Policies
DROP POLICY IF EXISTS "Users can view all activity" ON activity_history;
DROP POLICY IF EXISTS "Users can insert their own activity" ON activity_history;

CREATE POLICY "Users can view all activity" ON activity_history
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own activity" ON activity_history
  FOR INSERT WITH CHECK (true);

-- Badges Policies
DROP POLICY IF EXISTS "Everyone can view badges" ON badges;

CREATE POLICY "Everyone can view badges" ON badges
  FOR SELECT USING (true);

-- User Badges Policies
DROP POLICY IF EXISTS "Everyone can view user badges" ON user_badges;
DROP POLICY IF EXISTS "Users can insert their own badges" ON user_badges;

CREATE POLICY "Everyone can view user badges" ON user_badges
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own badges" ON user_badges
  FOR INSERT WITH CHECK (true);

-- Participations Policies
DROP POLICY IF EXISTS "Everyone can view participations" ON campaign_participations;
DROP POLICY IF EXISTS "Users can insert their own participations" ON campaign_participations;
DROP POLICY IF EXISTS "Users can update their own participations" ON campaign_participations;

CREATE POLICY "Everyone can view participations" ON campaign_participations
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own participations" ON campaign_participations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own participations" ON campaign_participations
  FOR UPDATE USING (true);

-- =====================================================
-- Seed Data - Initial Badges
-- =====================================================

INSERT INTO badges (name, description, icon, rarity, requirement_type, requirement_value) VALUES
  ('First Cleanup', 'Complete your first cleanup mission', '🌟', 'common', 'cleanups', 1),
  ('Plastic Slayer', 'Collect 50kg of plastic waste', '🏆', 'rare', 'kg_collected', 50),
  ('Beach Guardian', 'Complete 10 coastal cleanups', '💧', 'epic', 'cleanups', 10),
  ('Forest Ranger', 'Complete 10 forest cleanups', '🌲', 'legendary', 'cleanups', 10),
  ('Urban Hero', 'Complete 20 urban cleanups', '🏙️', 'epic', 'cleanups', 20),
  ('Eco Warrior', 'Collect 100kg of waste', '⚔️', 'legendary', 'kg_collected', 100),
  ('Green Pioneer', 'Be among the first 100 users', '🌱', 'rare', 'cleanups', 1)
ON CONFLICT DO NOTHING;

-- =====================================================
-- Functions & Triggers
-- =====================================================

-- Function to update user stats after participation verification
CREATE OR REPLACE FUNCTION update_user_stats_on_verification()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'verified' AND (OLD.status IS NULL OR OLD.status != 'verified') THEN
    DECLARE
      campaign_reward TEXT;
      campaign_difficulty INTEGER;
    BEGIN
      SELECT reward, difficulty INTO campaign_reward, campaign_difficulty
      FROM campaigns WHERE id = NEW.campaign_id;
      
      UPDATE user_profiles
      SET 
        total_cleanups = total_cleanups + 1,
        total_earnings = total_earnings + COALESCE(campaign_reward::DECIMAL, 0),
        trash_removed_kg = trash_removed_kg + 5,
        co2_offset_kg = co2_offset_kg + 2,
        updated_at = NOW()
      WHERE wallet_address = NEW.user_address;
      
      INSERT INTO activity_history (user_address, campaign_id, activity_type, impact_kg, reward_amount)
      VALUES (NEW.user_address, NEW.campaign_id, 'verification', 5, COALESCE(campaign_reward::DECIMAL, 0));
      
      UPDATE campaigns
      SET joined = joined + 1
      WHERE id = NEW.campaign_id;
    END;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists, then create
DROP TRIGGER IF EXISTS on_participation_verified ON campaign_participations;

CREATE TRIGGER on_participation_verified
  AFTER UPDATE ON campaign_participations
  FOR EACH ROW
  EXECUTE FUNCTION update_user_stats_on_verification();

-- Function to auto-create user profile
CREATE OR REPLACE FUNCTION create_user_profile_if_not_exists()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (wallet_address)
  VALUES (NEW.user_address)
  ON CONFLICT (wallet_address) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists, then create
DROP TRIGGER IF EXISTS auto_create_profile_on_participation ON campaign_participations;

CREATE TRIGGER auto_create_profile_on_participation
  BEFORE INSERT ON campaign_participations
  FOR EACH ROW
  EXECUTE FUNCTION create_user_profile_if_not_exists();
