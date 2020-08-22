import './styles.scss';

import React, { useState } from 'react';
import { UserEvent } from 'types';

import SearchBar from '../search-bar';
import LogRow from './components/log-row';

/**
 * @prop clearUserFilter - Callback to clear the User filter
 * @prop userEvents - A list of UserEvents to display
 * @prop userFilter - The User id to filter by
 */
interface Props {
  clearUserFilter: () => void;
  userEvents: UserEvent[];
  userFilter: string;
}

/** A log for displaying UserEvents */
const UserEventsLog: React.FC<Props> = (props: Props) => {
  /** Manage the value of the search bar */
  const [searchValue, setSearchValue] = useState<string>('');
  /** Manage a list of UserEvents filtered by the search bar value */
  const [searchedUserEvents, setSearchedUserEvents] = useState<UserEvent[]>([]);

  /** Update the search bar's value and filter the list of UserEvents */
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = event.target.value;
    const searchedUserEvents = props.userEvents.filter(
      (userEvent: UserEvent) => {
        // Create a string of all key values joined together, allowing us to search
        // for the existence of a substring across all columns
        const compositeString =
          Object.values(userEvent).join(' ') +
          new Date(userEvent.event_ts).toUTCString();
        return compositeString
          .toLowerCase()
          .includes(newSearchValue.toLowerCase());
      },
    );
    setSearchedUserEvents(searchedUserEvents);
    setSearchValue(newSearchValue);
  };

  // Detemine which list of UserEvents to display depending on the existiance of
  // an active search value
  const workingUserEvents = searchValue ? searchedUserEvents : props.userEvents;

  // Filter workingUserEvents by the active User filter if it exists
  const filteredUserEvents = props.userFilter
    ? workingUserEvents.filter(
        (userEvent: UserEvent) => userEvent.user_id === props.userFilter,
      )
    : workingUserEvents;

  return (
    <div className="user-events-card">
      <div className="user-events-card-header">
        <SearchBar value={searchValue} onChange={handleSearchChange} />
      </div>
      <div className="user-events-card-body">
        <div className="user-events-log">
          <div className="user-events-log-row header">
            <div className="user-events-log-cell header user-id">User ID</div>
            <div className="user-events-log-cell header real-name">
              Real Name
            </div>
            <div className="user-events-log-cell header event">Event</div>
            <div className="user-events-log-cell header timestamp">
              Timestamp
            </div>
          </div>
          <div className="user-events-log-body">
            {filteredUserEvents.map((userEvent: UserEvent) => (
              <LogRow key={userEvent.id} userEvent={userEvent} />
            ))}
            <div className="no-more-records-row">No older events found</div>
          </div>
        </div>
      </div>
      <div className="user-events-card-footer">
        <div className="filters-section-label">Filters</div>
        {props.userFilter && (
          <div className="filter-tag">
            <div
              onClick={props.clearUserFilter}
              className="clear-filter-icon-container"
            >
              x
            </div>
            <div className="filter-tag-value">user: {props.userFilter}</div>
          </div>
        )}
        {!props.userFilter && <div className="no-filter-text">None</div>}
      </div>
    </div>
  );
};

export default UserEventsLog;
