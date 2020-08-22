import { UserEventsRepository } from './user_events';
import { UsersRepository } from './users';

/** Database Interface Extensions */
interface IExtensions {
  userEvents: UserEventsRepository;
  users: UsersRepository;
}

export { IExtensions, UsersRepository };
