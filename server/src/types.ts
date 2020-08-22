/** Generic Slack event structure */
export interface SlackEvent {
  type: string;
  event_ts: number;
  [key: string]: any;
}
