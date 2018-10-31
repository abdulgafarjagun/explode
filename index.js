var {app} = require('./app');
var config = require('./config');
var serverWrapper = require('./server/serverwrapper');

app.addServer(new serverWrapper(config.httpPort, 'http', 'server started'));

app.startServers();