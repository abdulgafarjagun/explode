/*
*Environment variables
*
*/


//container object for all environment variables
var environments = {};

//environment variables for staging
environments.staging = {
    'httpPort': 3000,
    'httpsPort': 3001,
    'name': 'staging'
};

//environment variables for production
environments.production = {
    'httpPort': 5000,
    'httpsPort': 5001,
    'name': 'production'
};

//get the environment variable selected and validate it
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

//export the selected environment if it is one the environment variable object or export default environment as object
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

//export selected environment variable
module.exports = environmentToExport;