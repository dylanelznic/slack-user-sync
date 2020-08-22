/*
    Select a users record by id joined with user_events data
*/
SELECT DISTINCT ON (user_id) *
FROM users
LEFT JOIN user_events USING (user_id, team_id)
WHERE user_id = ($1)
ORDER BY user_id, event_ts DESC
