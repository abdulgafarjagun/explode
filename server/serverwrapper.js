
function ServerWrapper(port, serverType, message, serverOptions){
    this.port = port,
    this.serverType = serverType == '' ? 'http' : serverType,
    this.message = message,
    this.serverOptions = serverOptions,
    this.server = {}
};

module.exports = ServerWrapper;