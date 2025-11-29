-- Robust function to increment time and create profile if missing
CREATE OR REPLACE FUNCTION increment_time_spent(increment_amount INTEGER)
RETURNS VOID AS $$
DECLARE
  rows_affected INTEGER;
BEGIN
  -- Try to update the existing profile
  UPDATE profiles
  SET total_time_spent = COALESCE(total_time_spent, 0) + increment_amount
  WHERE id = auth.uid();
  
  GET DIAGNOSTICS rows_affected = ROW_COUNT;
  
  -- If no row was updated (profile missing), insert a new one
  IF rows_affected = 0 THEN
    INSERT INTO profiles (id, email, role, total_time_spent)
    SELECT id, email, 'student', increment_amount
    FROM auth.users
    WHERE id = auth.uid();
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
