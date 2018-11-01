var assert = require('chai');
var {app} = require('../app');
var serverWrapper = require('../server/serverwrapper');
var http = require('http');

describe('test for app add http server methods', function(){
    before(function(){
        app.addServer(new serverWrapper(8000, 'http', 'server test started'));
        app.startServers();
    });

    after(function(){
        app.stopServers();
    });
});

describe('default route', function(){
    it('should return status code 200', function(done){
        http.get('http://localhost:8000', function(res){
            assert.equal(200, res.statusCode);
            done();
        });
    });
});