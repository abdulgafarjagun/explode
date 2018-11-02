import {expect} from 'chai'
import {app} from '../app';
import serverWrapper from '../server/serverwrapper';
import http from 'http';


   

describe('default route', function(){
    before(function(){
        app.addServer(new serverWrapper(3001, 'http', 'server test started'));
        app.startServers();
    })
    after(function(){
        app.stopServers();
    })
    it('should return status code 200', function(done){
        
        http.get('http://localhost:3001/ping', function(res){
            expect(res.statusCode).to.equal(200);
            done();
        });
    });
});