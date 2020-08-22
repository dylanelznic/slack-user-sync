/** Model for the User entity */
export interface User {
  user_id: string;
  team_id: string;
}

/** Model for UserEvent entity */
export interface UserEvent {
  id: string;
  type: string;
  event_ts: Date;
  user_id: string;
  team_id: string;
  name: string;
  deleted: boolean;
  real_name: string | null;
  tz: string;
  title: string | null;
  phone: string | null;
  skype: string | null;
  display_name: string | null;
  status_text: string | null;
  status_emoji: string | null;
  avatar_hash: string | null;
  first_name: string | null;
  last_name: string | null;
}
