import { WebClient } from '@slack/web-api';
import { appConfig } from 'config';
import { db } from 'db';
import { User } from 'db/models';
import { UserEventsService } from 'services';
import { SlackEvent } from 'types';

/** Services functions for Users */
export class UsersService {
  /**
   * Fetch all existing users from a Slack workspace. Once they have all been
   * retrieved, insert each User alongside a UserEvent denoting their
   * sync event into the WorkSUS service
   */
  fetchExistingUsers = async (): Promise<void> => {
    try {
      // Initialize a new Slack Web API client
      const slackOAuthToken = appConfig.slack.oAuthAccessToken;
      const web = new WebClient(slackOAuthToken);
      let result: any[] = [];

      // Iterate through each paginated response until all users have been retrieved
      for await (const page of web.paginate('users.list', { limit: 1 })) {
        // Build a list of Slack users by concatenating each paginated response
        result = result.concat(page.members);
        if (!page.response_metadata.next_cursor) {
          // Translate the list of Slack users into a list of User entities
          const users = result.reduce((acc, record) => {
            return [
              ...acc,
              this.parseSlackUser({
                user: {
                  id: record.id,
                  team_id: record.team_id,
                },
              }),
            ];
          }, []);
          await db.users.insertMany(users);

          // Create a UserEvent for the sync event of each User
          const userEventService = new UserEventsService();
          const userEvents = result.reduce((acc, record) => {
            return [
              ...acc,
              userEventService.parseSlackUserEvent({
                type: 'sync_existing_user',
                event_ts: new Date().getTime() / 1000,
                user: {
                  ...record,
                },
              }),
            ];
          }, []);
          await db.userEvents.insertMany(userEvents);
          break;
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * Parse a Slack user record and format it into a User entity
   *
   * @param record - The Slack user to parse
   */
  parseSlackUser = (record: Partial<SlackEvent>): User => ({
    user_id: record.user.id,
    team_id: record.user.team_id,
  });
}
