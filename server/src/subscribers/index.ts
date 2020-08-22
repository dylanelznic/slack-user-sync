import { Router } from 'express';

import SlackEvents from './slack_events';

const router = Router();

/** Register API request listeners */
router.use('/slack/events', SlackEvents.requestListener());

export default router;
