import { Router } from 'express';

import UserEventsRoutes from './user_events';
import UsersRoutes from './users';

const router = Router();

/** Register API endpoints */
router.use('/user-events', UserEventsRoutes);
router.use('/users', UsersRoutes);

export default router;
