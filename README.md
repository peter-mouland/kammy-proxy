# kammy-proxy

 > a simple NodeJs proxy to support Kammy

Runs on [Heroku](https://dashboard.heroku.com/apps/kammy-proxy).
 - Proxies to Sky Sports Data to enable fetching directly from the browser.
 - Proxies to google-sheets to enable updating from the browser (uses [google-spreadsheet package](https://github.com/theoephraim/node-google-spreadsheet))

## Local Dev

 - `yarn start`

## env variables

 - SPREADSHEET_ACCESS_KEY
 - GOOGLE_SERVICE_ACCOUNT_EMAIL
 - GOOGLE_PRIVATE_KEY

### Google Keys: Setup Instructions

Create a service account for your project
  - In the sidebar on the left, select APIs & Services > Credentials
  - Click blue "+ CREATE CREDENITALS" and select "Service account" option
  - Enter name, description, click "CREATE"
  - You can skip permissions, click "CONTINUE"
  - Click "+ CREATE KEY" button
  - Select the "JSON" key type option
  - Click "Create" button
  - your JSON key file is generated and downloaded to your machine (it is the only copy!)
  - click "DONE"
_note your service account's email address (also available in the JSON key file)_

## API

### Trigger a Gatsby Build

 - admin/publish

### Sky Sports Routes
 - skysports/scores
 - skysports/fixtures
 - skysports/player_stats
 - skysports/players
 - skysports/player/:code

### Google Spreadsheet 'GET' Routes
 - spreadsheets/premierLeagueTransfers
 - spreadsheets/championshipTransfers
 - spreadsheets/leagueOneTransfers
 - spreadsheets/leagueTwoTransfers
 - spreadsheets/cup
 - spreadsheets/divisions
 - spreadsheets/gameWeeks
 - spreadsheets/players

### Google Spreadsheet 'POST' Routes
 - spreadsheets/transfers/premierLeague
 - spreadsheets/transfers/championship
 - spreadsheets/transfers/leagueOne
 - spreadsheets/transfers/leagueTwo
