# kammy-proxy

 > a simple NodeJs proxy to support Kammy

Runs on [Vercel](https://vercel.com/petermouland/kammy-proxy/deployments).
 - Proxies to google-sheets to enable updating from the browser (uses [google-spreadsheet package](https://github.com/theoephraim/node-google-spreadsheet))
 - Deployed to https://kammy-proxy.vercel.app/api/fpl

## Local Dev

 - not sure to be honest, `vercel dev`?

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
