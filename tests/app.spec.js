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
        _data.read('acronym', 'SC', function(err){
            if(!err){
                _data.delete('acronym', 'SC', function(err){
                    if(!err){
                        false;
                    }
                });
            }
        });
    })
    it('should return status code 200 for ping to http server', function(done){
        
        http.get('http://localhost:3001/ping', function(res){
            expect(res.statusCode).to.equal(200);
            done();
        });
    });
    it('should test create endpoint on acronym route', function(done){

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
                done();
            })
    });
    it('should test create endpoint on acronym route', function(done){

        chai.request('http://localhost:3001')
            .post('/acronym')
            .set('Content-Type', 'Application/json')
            .query({ acronym: 'SC'})
            .send({
                "acronym": "SC",
                "meaning": "Senior Consultant",
                "description": "Breaking down Objectives into measureable Key Results",
                "pioneer": "igbannam",
                "date" : "07/11/2018"
            }).end(function(err, res){
                expect(err).to.be.null;
                expect(res).status(200);
                done();
            })
    });
    it('should test update endpoint on acronym route', function(done){

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
                done();
            });
    });
    it(' should test for get all data on acronym route', function(done){

        chai.request('http://localhost:3001')
            .get('/acronym')
            .end(function(err, res){
                expect(err).to.be.null;
                expect(res).status(200);
                expect(res.body).to.be.not.null;
                expect(typeof(res.body)).to.be.equal('object');
                expect(res.body.length).to.be.greaterThan(1);
                done();
            });
    });
    it('should test get endpoint of acronym route by returning a single acronym', function(done){

        chai.request('http://localhost:3001')
            .get('/acronym')
            .query({acronym: "TSM"})
            .end(function(err, res){

                var testObj = {
                    "acronym": "TSM",
                    "meaning": "Technical Success Manager",
                    "description": "Breaking down Objectives into measureable and  time bound",
                    "pioneer": "mustapha",
                    "date" : "07/11/2018"
                }

                expect(res).status(200);
                expect(err).to.be.null;
                expect(res.body).to.be.eql(testObj);
                
                done();
            });
    });
    it('should test delete endpoint of acronym route', function(done){

        chai.request('http://localhost:3001')
            .del('/acronym')
            .query({acronym: 'TSM'})
            .end(function(err, res){
                expect(err).to.be.null;
                expect(res).status(200);

                done();
            });
    });

    /* it('https server should return status code 200', function(done){
        
        https.get('https://localhost:5001/ping', function(res){
            expect(res.statusCode).to.equal(200);
            done();
        });
    }); */
});