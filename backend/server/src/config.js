//variables sensibles de mi app

require('dotenv').config();

const envVarNames = [
  "NODE_ENV",
  "SERVER_PORT",
  "JWT_SECRET",
  "JWT_EXPIRATION",
  "DB_USER",
  "DB_PASSWORD",
  "DB_HOST",
  "DB_PORT",
  "DB_DATABASE",
];

let envVars = {};

envVarNames.forEach(varName => {
  if (process.env[varName] === undefined) {
    throw new Error(`Missing environment variable '${varName}'`);
  }
  envVars[varName] = process.env[varName];
})


module.exports = {
    ...envVars,
}