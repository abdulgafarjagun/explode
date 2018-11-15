import {expect} from 'chai'
import _data from '../lib/data'

describe('test for lib/data.create, lib/data.delete, lib/data.read and lib/data.update', function(){
    let obj = JSON.parse('{ "foo": "bar"}');
    let testObj = '';
    before('delete any file with similar name', function(){
        _data.read('test', 'file', function(err, data){
            if(!err){
                _data.delete('test', 'file', function(err){
                    if(err){
                        console.log(err);
                    }
                });
            }
        });
        
    });

    after('after test delete file created', function(){
        _data.delete('test', 'file', function(err){
            if(err){
                console.log(err);
            } 
        });
    });
    it('should be able to store data to file', function(done){

        _data.create('test', 'file', obj, function(err){
            if(!err){
                _data.read('test', 'file', function(err, data){
                    if(!err && data){
                        

                        expect(obj).to.deep.equal(data);
                        done();
                    }
                });
            } else {
                console.log(err);
            }
            
        });
        
    });

    it('should be able to update data in file', function(done){
        let updateObj = JSON.parse('{ "fizz": "buzz"}');
        _data.update('test', 'file', updateObj, function(err){
            if(!err){
                _data.read('test', 'file', function(err, data){
                    if(!err && data){

                        
                        expect(updateObj).to.deep.equal(data);
                        done();
                    } else {
                        console.log(err);
                    }
                });
            } else {
                console.log(err);
            }
            
        });
        
    });
});
