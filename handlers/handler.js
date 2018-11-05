/*
*
* route handlers
*/

//dependencies


//handler object
var handlers = {};

//not found handler
handlers.notFound = function(data, callback){
    //callback with a status 404
    callback(404);
};

//ping handler
handlers.ping = function(data, callback){
    //callback with a status 200
    callback(200);
};

module.exports = handlers;