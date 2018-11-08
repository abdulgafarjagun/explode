var {app} = require('./app');
var config = require('./config');
var fs = require('fs');
var serverWrapper = require('./server/serverwrapper');

app.addServer(new serverWrapper(config.httpPort, 'http', 'server has started'));

var serverOptions = {
    'key': fs.readFileSync('./server/https/key.pem'),
    'cert': fs.readFileSync('./server/https/cert.pem')
}

app.addServer(new serverWrapper(
    config.https, 
    'https', 
    'https server has started', 
    serverOptions));

app.startServers();