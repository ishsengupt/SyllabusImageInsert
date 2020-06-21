## How to run

In the project directory, you can run:
1. install node modules
`npm install`
2. Setup api url,
change src/env.example.js to src/env.js
adjust api key with your own on this line
`export const vision = {
  host: "https://vision.googleapis.com/v1/",
  api_key: "xxxx"
}`
3. run development
`npm run start`
