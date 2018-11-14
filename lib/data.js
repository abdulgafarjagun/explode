/*
*
* Library for storing data
*/

//dependencies
var fs = require('fs');
var path = require('path');
var helpers = require('./helpers');

//container for library
var lib = {};

//Library base path
lib.baseDir = path.join(__dirname, '/../.data/');

//write data to store
lib.create = function(dir, file, data, callback){
    //open file for writing
    fs.open(lib.baseDir+dir+'/'+file+'.json', 'wx', function(err, fileDescriptor){
        if(!err && fileDescriptor){

            //convert data to string
            var stringData = JSON.stringify(data);

            //write data to file and close it
            fs.writeFile(fileDescriptor, stringData, function(err){
                if(!err){
                    //close file
                    fs.close(fileDescriptor, function(err){
                        if(!err){
                            callback(false);
                        } else {
                            callback('Error closing file');
                        }
                    });
                } else {
                    callback('Error writing to file');
                }
            });
        } else {
            callback('Error opening file, might already exist')
        }
    });
};

//read data from source
lib.read = function(dir, file, callback){
    //read file from specified directory
    fs.readFile(lib.baseDir+dir+'/'+file+'.json', 'utf8', function(err, data){
        if(!err){
            var parsedData = helpers.parseJsonToObj(data);
            callback(false, parsedData);
        } else {
            callback(err, data);
        }
    });
};

//update data at source
lib.update = function(dir, file, data, callback){
     
    //open file for writing
    fs.open(lib.baseDir+dir+'/'+file+'.json', 'r+', function(err, fileDescriptor){
        if(!err && fileDescriptor){
            //get and convert data to be written to file
            var stringData = JSON.stringify(data);

            //file exists and its current content should be trauncated
            fs.truncate(fileDescriptor, function(err){
                if(!err){
                    //write data file and close it
                    fs.writeFile(fileDescriptor, stringData, function(err){
                        if(!err){
                            //close file
                            fs.close(fileDescriptor, function(err){
                                if(!err){
                                    callback(false);
                                } else {
                                    callback('Error, unable to close file')
                                }
                            });
                        } else {
                            callback('Error, unable to write to file');
                        }
                    });
                } else {
                    callback('Error, unable to truncate file');
                }
            });
        } else {
            callback('Error in openning file for writing, might not exist');
        }
    });
};

//delete a file
lib.delete = function(dir, file, callback){
    //unlink file from the directory
    fs.unlink(lib.baseDir+dir+'/'+file+'.json', function(err){
        if(!err){
            callback(false);
        } else {
            callback('Error, unable to delete file');
        }
    });
};

//export library
module.exports = lib;