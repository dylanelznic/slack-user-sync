import './App.scss';

import React, { useEffect, useState } from 'react';

import UserEventsLog from './components/user-events-log';
import UsersTable from './components/users-table';

/** The base url for the server */
const BASE_URL = process.env.REACT_APP_BASE_API_URL;

/** Root component */
const App: React.FC = () => {
  /** Manage the active tab */
  const [activeTab, setActiveTab] = useState('users');
  /** Manage the User entities retrieved from the server */
  const [users, setUsers] = useState([]);
  /** Manage the UserEvent entities retrieved from the server */
  const [userEvents, setUserEvents] = useState([]);
  /** Manage the active user filter */
  const [userFilter, setUserFilter] = useState('');
  /** Manage the Users table page number */
  const [usersPageNumber, setUsersPageNumber] = useState(1);

  /** Fetch Users on component mount */
  useEffect(() => {
    fetchUsers();
  }, []);

  /** Fetch all UserEvents from the server */
  const fetchUserEvents = async () => {
    try {
      const result = await fetch(`${BASE_URL}/user-events`);
      const userEvents = await result.json();
      setUserEvents(userEvents);
    } catch (e) {
      console.log(e);
    }
  };

  /** Fetch all Users from the server */
  const fetchUsers = async () => {
    try {
      const result = await fetch(`${BASE_URL}/users`);
      const users = await result.json();
      setUsers(users);
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * Set the active user filter
   *
   * @param userId - The User id to filter by
   */
  const handleSetUserFilter = (userId: string) => {
    setUserFilter(userId);
    fetchUserEvents();
    setActiveTab('events');
  };

  /**
   * Update the active tab
   *
   * @param tabValue - The unique identifier of the tab to activate
   */
  const handleTabClick = (tabValue: string) => {
    if (tabValue === 'events') {
      fetchUserEvents();
    } else if (tabValue === 'users') {
      fetchUsers();
    }
    setActiveTab(tabValue);
  };

  return (
    <div className="page">
      <div className="page-content">
        <div className="tab-bar-container">
          <div className="tab-bar-container">
            <div
              onClick={() => handleTabClick('users')}
              className={`tab ${activeTab === 'users' && 'active'}`}
            >
              Users
            </div>
            <div
              onClick={() => handleTabClick('events')}
              className={`tab ${activeTab === 'events' && 'active'}`}
            >
              Events
            </div>
          </div>
        </div>
        {activeTab === 'users' && (
          <UsersTable
            pageNumber={usersPageNumber}
            setPageNumber={setUsersPageNumber}
            setUserFilter={handleSetUserFilter}
            users={users}
          />
        )}
        {activeTab === 'events' && (
          <UserEventsLog
            clearUserFilter={() => setUserFilter('')}
            userEvents={userEvents}
            userFilter={userFilter}
          />
        )}
      </div>
    </div>
  );
};

export default App;
