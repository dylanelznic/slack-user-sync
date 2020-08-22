import './styles.scss';

import React, { useState } from 'react';
import { UserEvent } from 'types';

/** Columns to exclude from the extra-data row */
const EXCLUDE_COLUMNS = ['user_id', 'real_name', 'type', 'event_ts'];

/**
 * @prop userEvent - The UserEvent to display
 */
interface Props {
  userEvent: UserEvent;
}

/** An expandable row for displaying UserEvents */
const LogRow: React.FC<Props> = (props: Props) => {
  /** Manage the state of the log row being expanded */
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="user-events-log-row-container"
    >
      <div className="user-events-log-row">
        <div className="user-events-log-cell user-id">
          {props.userEvent.user_id}
        </div>
        <div className="user-events-log-cell real-name">
          {props.userEvent.real_name}
        </div>
        <div className="user-events-log-cell event">{props.userEvent.type}</div>
        <div className="user-events-log-cell timestamp">
          {new Date(props.userEvent.event_ts).toUTCString()}
        </div>
      </div>
      {expanded && (
        <div className="extra-data-row">
          {Object.keys(props.userEvent).map((key: string) => {
            if (!EXCLUDE_COLUMNS.includes(key)) {
              return (
                <div
                  key={`${props.userEvent.id}-${key}`}
                  className="extra-data-key-pair"
                >
                  <div className="extra-data-key">{`${key}:`}</div>
                  <div className="extra-data-value">{props.userEvent[key]}</div>
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default LogRow;
