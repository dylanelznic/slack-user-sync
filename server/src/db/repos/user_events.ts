import { ColumnSet, IDatabase, IMain } from 'pg-promise';

import { UserEvent } from '../models';
import { userEvents as sql } from '../sql';

/** DB access for the user_events table */
export class UserEventsRepository {
  /** Read-only structure with query-formatting columns */
  cs: ColumnSet;

  /**
   * @param db - Automated database connection context/interface.
   * @param pgp - Pg-promise root
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private db: IDatabase<any>, private pgp: IMain) {
    this.cs = new pgp.helpers.ColumnSet(
      [
        'id',
        'type',
        'event_ts',
        'user_id',
        'team_id',
        'name',
        'deleted',
        'real_name',
        'tz',
        'title',
        'phone',
        'skype',
        'display_name',
        'status_text',
        'status_emoji',
        'avatar_hash',
        'first_name',
        'last_name',
      ],
      {
        table: 'user_events',
      },
    );
  }

  /**
   * Select all UserEevnts, returning a list of UserEvents
   */
  all = async (): Promise<UserEvent[]> => {
    return this.db.many(sql.all);
  };

  /**
   * Insert a list of new UserEvents, returning the list of new UserEvents
   *
   * @param userEvents - The list of UserEvents to insert
   */
  insertMany = (userEvents: UserEvent[]): Promise<UserEvent[]> => {
    const query = this.pgp.helpers.insert(userEvents, this.cs);
    return this.db.result(query);
  };
}
