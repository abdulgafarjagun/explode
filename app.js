
var http = require('http');
var https = require('https');
var service = require('./server/service');


//parent obect for API application
var app = {
    'servers': []
};

//add new server to API application
app.addServer = (server) => {
    //append server info to server message
    server.message += 'type: ' +server.serverType+ ', port: ' +server.port;

    //depending on severType create either http or https server
    server.server = typeof(server.serverType) == 'https'  ? https
    //for creating a new https server
    .createServer(server.serverOptions, function(req, res){
        //pass the server request
        service(req, res, handlers, routes);
        //for creating a new http server
    }) : http.createServer(function(req,res){
        //pass server request to core service along with response handlers and routes
        service(req, res, handlers, routes);
    })
    //add server to array of servers
    app.servers.push(server);
};

//start all servers in API application
app.startServers = () => {
    app.servers.forEach(
        server => server.server.listen(server.port, function(){
            console.log(server.message);
        })
    );
};

//stop all servers in API application
app.startServers = () => {
    app.servers.forEach(
        server => server.server.close(function(){
            console.log('server stopped');
        })
    );
};


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

//define routes
var routes = {
    'ping': handlers.ping
};


module.exports = {app}