import {expect} from 'chai'
import _data from '../lib/data'

describe('test for lib/data.create, lib/data.delete, lib/data.read and lib/data.update', function(){
    let obj = JSON.parse('{ "foo": "bar"}');
    let testObj = '';
    before('delete any file with similar name', function(){
        _data.delete('test', 'file', function(err){
            if(err){
                console.log(err);
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
                    if(!err){
                        testObj = JSON.parse(data);

                        expect(JSON.stringify(obj)).to.deep.equal(JSON.stringify(testObj));
                        done();
                    }
                });
            } else {
                console.log(err);
            }
        });
    });

    it('should be able to update data in file', function(done){
        let newObj = JSON.parse('{ "fizz": "buzz"}');
        _data.update('test', 'file', newObj, function(err){
            if(!err){
                _data.read('test', 'file', function(err, data){
                    if(!err){
                        
                        expect(JSON.stringify(newObj)).to.deep.equal(data);
                        done();
                    } else {
                        console.log(done);
                    }
                })
            } else {
                console.log(err);
            }
        });
    });
});
