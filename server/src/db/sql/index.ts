import { join as joinPath } from 'path';

import { IQueryFileOptions, QueryFile } from 'pg-promise';

/** SQL queries for the user_events table */
export const userEvents = {
  all: sql('user_events/all.sql'),
};

/** SQL queries for the users table */
export const users = {
  all: sql('users/all.sql'),
  byId: sql('users/by-id.sql'),
};

/**
 * Helper for linking to external query files
 *
 * @param file - The SQL file to link
 */
function sql(file: string): QueryFile {
  const fullPath: string = joinPath(__dirname, file);

  const options: IQueryFileOptions = {
    compress: true,
    minify: true,
  };

  // Represents an external SQL file
  const qf: QueryFile = new QueryFile(fullPath, options);

  if (qf.error) {
    console.error(qf.error);
  }

  return qf;
}
