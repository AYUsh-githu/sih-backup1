-- Add total_time_spent column to profiles table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'total_time_spent') THEN
        ALTER TABLE profiles ADD COLUMN total_time_spent INTEGER DEFAULT 0;
    END IF;
END $$;

-- Create or replace the RPC function to increment time spent
CREATE OR REPLACE FUNCTION increment_time_spent(increment_amount INTEGER)
RETURNS VOID AS $$
BEGIN
  UPDATE profiles
  SET total_time_spent = COALESCE(total_time_spent, 0) + increment_amount
  WHERE id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
