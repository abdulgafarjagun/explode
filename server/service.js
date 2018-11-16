var url = require('url');
var { StringDecoder } = require('string_decoder');
var requestHandler = require('./request_handlers');
var helpers = require('../lib/helpers');

//core server service, encapsulates the core feature of each server, it takes in the server; request, response, handlers and routes
function Service(req, res, handlers, routes){

    var parseUrl = url.parse(req.url, true);
    var dataChunks = '';
    var decoder = new StringDecoder('utf8');

    //request on data received event
    req.on('data', function(data){
        //for every chunk of data received append it to the data chunks
        dataChunks += decoder.write(data);
    });

    //request on end event 
    req.on('end', function(){

        //object to hold a request data
        var data = {
            path: parseUrl.pathname.replace(/^\/+|\/+$/g, ''),
            method : req.method.toLowerCase(),
            headers : req.headers,
            queryStringObject : parseUrl.query,
            payload : helpers.parseJsonToObj(dataChunks)
        }

        

        //handle the request depending on the request
        requestHandler(data, handlers, routes, req, res);
    })

    

}

module.exports = Service;