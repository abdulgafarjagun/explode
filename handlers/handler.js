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
                //callback(400, {"Error" : "this acronym already exists"});
                callback(400, {
                    code : 400, 
                    data: [],
                    message:"this acronym already exists",
                    status: 'fail'
                });
            } else {
                _data.create('acronym', model.acronym, model, function(err){
                    if(!err){
                        callback(200);
                    } else {
                        console.log(err);
                        callback(500, {
                            code : 500, 
                            data: [],
                            message:"could not create a new acronym",
                            status: 'fail'
                        });
                    }
                });
            }
        });

    } else {
        callback(400, { "Error": "this is not a valid acronym object"});
    }
};

//GET
handlers.acronymMethods.get = function(data, callback) {

    var acronym = typeof(data.queryStringObject.acronym) == 'string' ? data.queryStringObject.acronym.trim() : false;
    
     if (acronym) {
        _data.read('acronym', acronym, function(err, data){
            if(!err && data){
                callback(200, data);
            } else {
                callback(404, {'Error': 'acronym you requested was not found'});
            }
        });
    } else {
        if(!acronym){
            _data.getAllFiles('acronym', function(err, data){
                if(!err && data){
                    callback(200, data);
                } else {
                    callback(404, {'Error': 'no acronym on record'})
                }
            });
        }
    }
};

//PUT
handlers.acronymMethods.put = function(data, callback) {

    var _ = data.payload;
    var model = new acronym(
        _.acronym,
        _.meaning,
        _.description,
        _.pioneer,
        _.date,
    );
    

    if(model.acronym && model.meaning && model.description && model.pioneer && model.date){
        _data.read('acronym', _.acronym, function(err, data){
            if(!err && data){
                _data.delete('acronym', _.acronym, function(err){
                    if(!err){
                        _data.create('acronym', model.acronym, model, function(err){
                            if(!err){
                                callback(200);
                            } else {
                                console.log(err);
                                callback(500, { "Error": "could not update acronym"});
                            }
                        });
                    } else {
                        callback(err);
                    }
                });
            } else {
                callback(err);
            }
        });
    } else {
        callback(400, { 'Error': 'incomplete update data'});
    }

};

//DELETE
handlers.acronymMethods.delete = function(data, callback) {

    //check if the acronym query has a value
    acronym = typeof(data.queryStringObject.acronym) === 'string' ? data.queryStringObject.acronym : false;
    
    if(acronym){
        _data.read('acronym', acronym, function(err, data){
            if(!err && data){
                _data.delete('acronym', acronym, function(err){
                    if(!err){
                        callback(200);
                    }
                });
            } else {
                callback(404, {"Error": "data to be deleted does not exist"});
            }
        });
    } else {
        callback(err, {"Error": "General Delete error"});
    }
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