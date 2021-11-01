## Instructions
# Prompt
Build a single page application that displays various Properties. Use any frameworks you like. Be creative. UI frameworks are OK but we also want to see your ability to add style to the layout.
# Instructions
Use the bare wireframe image to build a page with Property cards at the top. When clicking on a Property, show all relevant Leases in a table. When completed, please email your project zip file to talent@ender.com. If you use a code hosting platform like Github.com, please make the repo private.
# API
When fetching data, you must include 'token' in the request body.
propertiesApiUrl: "https://talent.ender.com/fe-challenge/properties"
propertyApiUrl: "https://talent.ender.com/fe-challenge/properties/[PROPERTY ID]/leases"

## Local Setup:
# `npm install`
Installs Dependancies.

# `npm start`
Starts app locally.

# Environmental Variables
See the `sample.env` to see how the `.env` file should be configured. Not that no data can be fetched without this.