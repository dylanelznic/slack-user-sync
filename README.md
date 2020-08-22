# Slack User Sync ⚓️

Maintain logs for your workspace with Slack User Sync

<img src="https://raw.githubusercontent.com/dylanelznic/slack-user-sync/master/images/slack-user-sync-screenshot.png" width="800" />

# Quick Start

Clone the repo into your local evironment.

```
git clone https://github.com/dylanelznic/slack-user-sync.git
```

Install dependencies in both `client` and `server`

```
npm install
```

Set up your environment variables as outlined in `.env.example` for both `client` and `server`
Examples

```
REACT_APP_BASE_API_URL=https://mydomain.com
```

```
# Database Variables
DB_HOST={localhost}
DB_PORT={5432}
DB_DATABASE={database_name}
DB_USER={username}
DB_PASSWORD={password}

# Express Variables
PORT={8080}

# Slack Variables
SLACK_SIGNING_SECRET={signing_secret}
SLACK_OAUTH_ACCESS_TOKEN={xoxp-slack_oatuh_access_token}

```

Run the both the client and the server in separate processes

```
// Client
npm start

// Server
npm run dev
```

# Creating a Slack app

In order to use WorkSUS with your own Slack workspace, you will need to first create your own Slack app. Slack provides great [resources](https://api.slack.com/start/overview) for accomplishing this.

Once you have created your app, you will want to find your **signing secret** and **OAuth access token** in order to populate your `env` variables.

### Signing Secret

Navigate to your app's landing page via https://api.slack.com/apps. You will find your **signing secret** within the `App Credentials` section.

### OAuth Access Token

This one is a bit tricker, as it doesn't live in the `App Credentials` as you might expect. To find your **OAuth Access Token**, click on the `OAuth & Permissions` option under the `Features` section of the sidebar. If you have already installed your app to your workplace and set up your `User Token Scopes`, you will be able to grab your token right away. Otherwise, follow along with the [user token scopes](#user-token-scopes) to get set up.

### User Token Scopes

User token scopes are scopes that allow us to access user data. WorkSUS requires the following User Token Scope: `users:read`. This scope allows WorkSUS to view users within the workspace. In order to add these scopes to our app, simply click on `Add an OAuth Scope` and select them from the dropdown.

Once you have your scopes set up, you should be able to retrieve your **OAuth Access Token** from the `Tokens for your Workspace` section of the page.

### Event Subscriptions

Similar to User Token Scopes, you will need to subscribe to two "events on behalf of users". To do this, navigate to the `Event Subscriptions` option within the sidebar. From here, you will want to expand the `Subscribe to events on behalf of users` section, and add two workspace events: `team_join` and `user_change`.

#### Request URL

In order for these events to successfully emit to to our WorkSUS server, we will need to validate a `Request URL`. The `Request URL` is the URL that Slack will send events to, but in order to do so we must validate the URL first. You can [read more about the process here](https://api.slack.com/events/url_verification). Because WorkSUS is built using the [Node Slack SDK](https://slack.dev/node-slack-sdk/), you are able to use their verify tool to validate your `Request URL`.

```
$ ./node_modules/.bin/slack-verify --secret <signing_secret> [--path=/slack/events] [--port=8080]
```

# Setting Up the Database

While not the only way to set up your database, WorkSUS provides migrations that can help streamline the process. In order to use them, you will first need to install [Flyway](https://flywaydb.org/). Flyway is a simple and easy to use database migration tool. Once installed, you will want to populate the values found in the [config file](https://github.com/dylanelznic/slack-user-sync-server/blob/master/db/migrations/flyway.conf). You are able to export these values or edit them in-file.

```
# Config
flyway.url=${FLYWAY_URL}
flyway.user=${FLYWAY_USER}
flyway.password=${FLYWAY_PASSWORD}
flyway.locations=${FLYWAY_LOCATIONS}

# To Populate:
export FLYWAY_URL=jdbc:{url}
export FLYWAY_USER={username}
export FLYWAY_PASSWORD={password}
export FLYWAY_LOCATIONS={filesystem:.}
```

Once you are set up, simply run `flyway migrate` within the project directory and your tables will be created and updated for you.
