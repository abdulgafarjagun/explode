/*
 * Helper methods
 *
 */

//Dependencies
var crypto = require('crypto');

//container for helpers
 var helpers = {};

//generate a new guid
helpers.getGUID = function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

//parse JSON to object
helpers.parseJsonToObj = function(json){
    try {
        var obj = JSON.parse(json);
        return obj;
    } catch(e) {
        return { 'fizz':'buzz'};
    }
}

//export helpers module
module.exports = helpers;

