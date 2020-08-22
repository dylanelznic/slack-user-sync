import './styles.scss';

import React, { useState } from 'react';
import { UserComposite } from 'types';

import SearchBar from '../../components/search-bar';

// The number of rows displayed within the table
const TABLE_ROW_COUNT = 13;

/**
 * @prop pageNumber - The table's current page number
 * @prop setPageNumber - Callback to set the table's current page number
 * @prop setUserFilter - Callback to set the active User filter
 * @prop users - A list of Users to display
 */
interface Props {
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
  setUserFilter: (userId: string) => void;
  users: UserComposite[];
}

/** A table for displaying Users */
const UsersTable: React.FC<Props> = (props: Props) => {
  /** Manage the value of the search bar */
  const [searchValue, setSearchValue] = useState<string>('');
  /** Manage a list of Users filtered by the search bar value */
  const [searchedUsers, setSearchedUsers] = useState<UserComposite[]>([]);

  /** Update the search bar's value and filter the list of Users */
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = event.target.value;
    const searchedUsers = props.users.filter((user: UserComposite) => {
      // Create a string of all key values joined together, allowing us to search
      // for the existence of a substring across all columns
      const compositeString =
        Object.values(user).join(' ') + new Date(user.event_ts).toUTCString();
      return compositeString
        .toLowerCase()
        .includes(newSearchValue.toLowerCase());
    });
    setSearchedUsers(searchedUsers);
    setSearchValue(newSearchValue);
  };

  // Detemine which list of Users to display depending on the existiance of
  // an active search value
  const workingUsers = searchValue ? searchedUsers : props.users;

  // Paginate the workingUsers in order to ony render the
  // current TABLE_ROW_COUNT number of Users
  const paginatedUsers = workingUsers.slice(
    (props.pageNumber - 1) * TABLE_ROW_COUNT,
    props.pageNumber * TABLE_ROW_COUNT,
  );

  const prevButtonDisabled = props.pageNumber === 1;
  const nextButtonDisabled =
    workingUsers[props.pageNumber * TABLE_ROW_COUNT + 1] === undefined;

  return (
    <div className="users-card">
      <div className="users-card-header">
        <SearchBar value={searchValue} onChange={handleSearchChange} />
      </div>
      <div className="users-card-body">
        <div className="users-table">
          <div className="users-table-row header">
            <div className="users-table-cell header user-id">User ID</div>
            <div className="users-table-cell header real-name">Real Name</div>
            <div className="users-table-cell header display-name">
              Display Name
            </div>
            <div className="users-table-cell header last-updated">
              Last Updated
            </div>
          </div>
          {paginatedUsers.map((user: UserComposite) => (
            <div key={user.user_id} className="users-table-row">
              <div
                onClick={() => props.setUserFilter(user.user_id)}
                className="users-table-cell body user-id"
              >
                {user.user_id}
              </div>
              <div className="users-table-cell body real-name">
                {user.real_name}
              </div>
              <div className="users-table-cell body display-name">
                {user.display_name}
              </div>
              <div className="users-table-cell body last-updated">
                {new Date(user.event_ts).toUTCString()}
              </div>
            </div>
          ))}
          {paginatedUsers.length < TABLE_ROW_COUNT && (
            <div className="no-more-records-row">No more records found</div>
          )}
        </div>
      </div>
      <div className="users-card-footer">
        <div className="page-buttons-container">
          <div className="page-button-container">
            {!prevButtonDisabled && (
              <button
                onClick={() => props.setPageNumber(props.pageNumber - 1)}
                className="prev-page-button"
              >
                {'<'}
              </button>
            )}
          </div>
          <div className="page-number">{props.pageNumber}</div>
          <div className="page-button-container">
            {!nextButtonDisabled && (
              <button
                onClick={() => props.setPageNumber(props.pageNumber + 1)}
                className="next-page-button"
              >
                {'>'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
