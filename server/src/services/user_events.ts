import { UserEvent } from 'db/models';
import { SlackEvent } from 'types';
import { v4 as uuidv4 } from 'uuid';

/** Services functions for UserEvents */
export class UserEventsService {
  /**
   * Parse a Slack user event record and format it into a UserEvent entity
   *
   * @param record - The Slack user event to parse
   */
  parseSlackUserEvent = (record: SlackEvent): UserEvent => ({
    id: uuidv4(),
    type: record.type,
    event_ts: new Date(record.event_ts * 1000),
    user_id: record.user.id,
    team_id: record.user.team_id,
    name: record.user.name,
    deleted: record.user.deleted,
    real_name: record.user.real_name,
    tz: record.user.tz,
    title: record.user.profile.title,
    phone: record.user.profile.phone,
    skype: record.user.profile.skype,
    display_name: record.user.profile.display_name,
    status_text: record.user.profile.status_text,
    status_emoji: record.user.profile.status_emoji,
    avatar_hash: record.user.profile.avatar_hash,
    first_name: record.user.profile.first_name,
    last_name: record.user.profile.last_name,
  });
}
