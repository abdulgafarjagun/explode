/*
*
* route handlers
*/

//dependencies
var acronym = require('../models/acronym-model');
var _data = require('../lib/data');


//handler object
var handlers = {};

//acronym handler
handlers.acronym = function(data, callback){
    var methods = ['get', 'put', 'post', 'delete'];
    if(methods.indexOf(data.method) > -1){
        handlers.acronymMethods[data.method](data, callback);
    } else {
        callback(405);
    }
};

//acronym methods
handlers.acronymMethods = {};

//acronym, meaning, description, pioneer, date

//POST
handlers.acronymMethods.post = function(data, callback) {
    var _ = data.payload;
    var model = new acronym(
        _.acronym,
        _.meaning,
        _.description,
        _.pioneer,
        _.date,
    );
    

    if(model.acronym && model.meaning && model.description && model.pioneer && model.date){
        //check if acronym already exists
        _data.read('acronym', model.acronym, function(err, data){
            if(!err){
                callback(400, 'this acronym already exists');
            } else {
                _data.create('acronym', model.acronym, model, function(err){
                    if(!err){
                        callback(200);
                    } else {
                        console.log(err);
                        callback(500, { 'Error': 'could not create a new acronym'});
                    }
                });
            }
        });

    } else {
        callback(400, { 'Error': 'this is not a valid acronym object'});
    }
};

//GET
handlers.acronymMethods.get = function(data, callback) {

};

//PUT
handlers.acronymMethods.put = function(data, callback) {

};

//DELETE
handlers.acronymMethods.delete = function(data, callback) {

};

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