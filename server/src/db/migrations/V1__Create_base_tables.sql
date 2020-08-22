CREATE TABLE users (
	user_id VARCHAR(255) NOT NULL,
	team_id VARCHAR(255) NOT NULL,
	PRIMARY KEY (user_id, team_id)
);

CREATE TABLE user_events (
	id UUID,
	type VARCHAR(255) NOT NULL,
	event_ts VARCHAR(255) NOT NULL,
	user_id VARCHAR(255) NOT NULL,
	team_id VARCHAR(255) NOT NULL,
	name VARCHAR(255),
	deleted BOOLEAN,
	real_name VARCHAR(255),
	tz VARCHAR(255),
	title VARCHAR(255),
	phone VARCHAR(255),
	skype VARCHAR(255),
	display_name VARCHAR(255),
	status_text VARCHAR(255),
	status_emoji VARCHAR(255),
	avatar_hash VARCHAR(255),
	first_name VARCHAR(255),
	last_name VARCHAR(255),
	FOREIGN KEY (user_id, team_id) REFERENCES users(user_id, TEAM_ID)
);
