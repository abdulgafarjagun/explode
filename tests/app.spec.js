import {expect} from 'chai'
import chai from 'chai'
import chaiHttp from 'chai-http'
import {app} from '../app';
import serverWrapper from '../server/serverwrapper';
import http from 'http';
import https from 'https';
import fs from 'fs'
import _data from '../lib/data'

chai.use(chaiHttp);

   

describe('test if app.startServers and app.stopServers is working', function(){
    this.beforeAll(function(){

        /* var serverOptions = {
            'cert': fs.readFileSync('./../server/https/cert.pem'),
            'key': fs.readFileSync('../server/https/key.pem')
        } */

        app.addServer(new serverWrapper(3001, 'http', 'server test started'));
        /* app.addServer(new serverWrapper(5001, 'https', 'server test started', serverOptions)); */

        app.startServers();
    })
    after(function(){
        app.stopServers();
        _data.read('acronym', 'TSM', function(err){
            if(!err){
                _data.delete('acronym', 'TSM', function(err){
                    if(!err){
                        false;
                    }
                });
            }
        });
    })
    it('http server should return status code 200', function(done){
        
        http.get('http://localhost:3001/ping', function(res){
            expect(res.statusCode).to.equal(200);
            done();
        });
    });
    it('test for create endpoint on acronym route', function(){

        chai.request('http://localhost:3001')
            .post('/acronym')
            .set('Content-Type', 'Application/json')
            .query({ acronym: 'TSM'})
            .send({
                "acronym": "TSM",
                "meaning": "Technical Success Manager",
                "description": "Breaking down Objectives into measureable Key Results",
                "pioneer": "mustapha",
                "date" : "07/11/2018"
            }).end(function(err, res){
                expect(err).to.be.null;
                expect(res).status(200);
            })
    });
    it('test for update endpoint on acronym route', function(){

        chai.request('http://localhost:3001')
            .put('/acronym')
            .set('Content-Type', 'Application/json')
            .query({ acronym: 'TSM'})
            .send({
                "acronym": "TSM",
                "meaning": "Technical Success Manager",
                "description": "Breaking down Objectives into measureable and  time bound",
                "pioneer": "mustapha",
                "date" : "07/11/2018"
            }).end(function(err, res){
                expect(err).to.be.null;
                expect(res).status(200);
            });
    });

    /* it('https server should return status code 200', function(done){
        
        https.get('https://localhost:5001/ping', function(res){
            expect(res.statusCode).to.equal(200);
            done();
        });
    }); */
});