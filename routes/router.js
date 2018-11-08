/*
*
*Api routes
*/

//dependencies
var handlers = require('./../handlers/handler');


//define routes
var router = {
    'ping': handlers.ping,
    'acronym': handlers.acronym
};

module.exports = router;
