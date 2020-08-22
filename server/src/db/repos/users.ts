import { ColumnSet, IDatabase, IMain } from 'pg-promise';

import { User } from '../models';
import { users as sql } from '../sql';

/** DB access for the users table */
export class UsersRepository {
  /** Read-only structure with query-formatting columns */
  cs: ColumnSet;

  /**
   * @param db - Automated database connection context/interface.
   * @param pgp - Pg-promise root
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private db: IDatabase<any>, private pgp: IMain) {
    this.cs = new pgp.helpers.ColumnSet(['user_id', 'team_id'], {
      table: 'users',
    });
  }

  /**
   * Select all Users joined wiht UserEvent metadata,
   * returning a list of Users
   */
  all = async (): Promise<User[]> => {
    return this.db.many(sql.all);
  };

  /**
   * Select a User by id, returning the User joined with UserEvent
   * metadata or null
   *
   * @param id - The id of the User to select
   */
  byId = async (id: string): Promise<User | null> => {
    return this.db.oneOrNone(sql.byId, id);
  };

  /**
   * Insert a list of new Users, returning the list of new Users
   *
   * @param users - The list of Users to insert
   */
  insertMany = (users: User[]): Promise<User[]> => {
    const query = this.pgp.helpers.insert(users, this.cs);
    return this.db.result(query);
  };
}
