/*
    Select all users records joined with user_events metadata
*/
SELECT DISTINCT ON (user_id) *
FROM users
LEFT JOIN user_events USING (user_id, team_id)
ORDER BY user_id, event_ts DESC
