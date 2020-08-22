import 'module-alias/register';

import { appConfig } from 'config';
import { db } from 'db';
import { UsersService } from 'services';
import { logger } from 'utils';

import app from './app';

/** Start server and begin listening on the specified port */
app.listen(appConfig.express.port, async () => {
  logger.info(`Server now listening on port ${appConfig.express.port}!`);

  // Fetch existing Slack users
  const users = await db.users.all();
  if (users.length < 1) {
    const usersService = new UsersService();
    await usersService.fetchExistingUsers();
  }
});
