import { UsersRepository } from './users';
import { UserEventsRepository } from './user_events';

/** Database Interface Extensions */
interface IExtensions {
  userEvents: UserEventsRepository;
  users: UsersRepository;
}

export { IExtensions, UsersRepository };
