/** Environment variables for the app */
export interface AppVariables {
  express: ExpressVariables;
  slack: SlackVariables;
}

/** Environment variables for Express */
export interface ExpressVariables {
  port: string;
}

/** Evnironment variables for Slack */
export interface SlackVariables {
  signingSecret: string;
  oAuthAccessToken: string;
}

/** Evnironment variables for the DB */
export interface DBVariables {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}
