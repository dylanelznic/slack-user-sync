import { createEventAdapter } from '@slack/events-api';
import { appConfig } from 'config';
import { db } from 'db';
import { UserEventsService } from 'services';
import { SlackEvent } from 'types';

const slackEvents = createEventAdapter(appConfig.slack.signingSecret);

/** Insert a new UserEvent upon receiving a user_change event */
slackEvents.on('user_change', async (event: SlackEvent) => {
  const userEventsService = new UserEventsService();
  const parsedEvent = userEventsService.parseSlackUserEvent(event);
  const user = await db.users.byId(parsedEvent.user_id);
  if (user) {
    await db.userEvents.insert(parsedEvent);
  }
});

/** Insert a new User and UserEvent upon receiving a team_join event */
slackEvents.on('team_join', async (event: SlackEvent) => {
  const userEventsService = new UserEventsService();
  const parsedEvent = userEventsService.parseSlackUserEvent(event);
  const user = {
    user_id: event.user.id,
    team_id: event.user.team_id,
  };
  await db.users.insert(user);
  await db.userEvents.insert(parsedEvent);
});

export default slackEvents;
