
var http = require('http');
var https = require('https');
var service = require('./server/service');
var handlers = require('./handlers/handler');
var routes = require('./routes/router');


//parent obect for API application
var app = {
    'servers': []
};

//add new server to API application
app.addServer = (server) => {

    //append server info to server message
    server.message += 'type: ', server.serverType, ', port: ', server.port;

    //depending on severType create either http or https server
    server.server = typeof(server.serverType) == 'https'  ? https

    //for creating a new https server
    .createServer(server.serverOptions, function(req, res){


        service(req, res, handlers, routes);

        //for creating a new http server
    }) : http.createServer(function(req,res){

        
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
app.stopServers = () => {
    app.servers.forEach(
        server => server.server.close(function(){
            console.log('server stopped');
        })
    );
};



module.exports = {app}