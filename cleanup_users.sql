-- Cleanup script for unwanted users (e.g., @example.com)

-- 1. Delete from user_assessment_responses (child of user_assessments)
DELETE FROM user_assessment_responses
WHERE user_assessment_id IN (
    SELECT id FROM user_assessments
    WHERE user_id IN (
        SELECT id FROM auth.users
        WHERE email LIKE '%@example.com'
    )
);

-- 2. Delete from user_assessments
DELETE FROM user_assessments
WHERE user_id IN (
    SELECT id FROM auth.users
    WHERE email LIKE '%@example.com'
);

-- 3. Delete from user_clinical_logs
DELETE FROM user_clinical_logs
WHERE user_id IN (
    SELECT id FROM auth.users
    WHERE email LIKE '%@example.com'
);

-- 4. Delete from wellness_tasks
DELETE FROM wellness_tasks
WHERE user_id IN (
    SELECT id FROM auth.users
    WHERE email LIKE '%@example.com'
);

-- 5. Delete from stress_assessments
DELETE FROM stress_assessments
WHERE user_id IN (
    SELECT id FROM auth.users
    WHERE email LIKE '%@example.com'
);

-- 6. Delete from journals
DELETE FROM journals
WHERE user_id IN (
    SELECT id FROM auth.users
    WHERE email LIKE '%@example.com'
);

-- 7. Delete from sessions
DELETE FROM sessions
WHERE user_id IN (
    SELECT id FROM auth.users
    WHERE email LIKE '%@example.com'
);

-- 8. Delete from alerts
DELETE FROM alerts
WHERE student_id IN (
    SELECT id FROM auth.users
    WHERE email LIKE '%@example.com'
);

-- 9. Delete from chat_history
DELETE FROM chat_history
WHERE user_id IN (
    SELECT id FROM auth.users
    WHERE email LIKE '%@example.com'
);

-- 10. Delete from resilience_assessments
DELETE FROM resilience_assessments
WHERE user_id IN (
    SELECT id FROM auth.users
    WHERE email LIKE '%@example.com'
);

-- 11. Delete from resilience_reframes
DELETE FROM resilience_reframes
WHERE user_id IN (
    SELECT id FROM auth.users
    WHERE email LIKE '%@example.com'
);

-- 12. Delete from resilience_social_map
DELETE FROM resilience_social_map
WHERE user_id IN (
    SELECT id FROM auth.users
    WHERE email LIKE '%@example.com'
);

-- 13. Delete from profiles
DELETE FROM profiles
WHERE id IN (
    SELECT id FROM auth.users
    WHERE email LIKE '%@example.com'
);
