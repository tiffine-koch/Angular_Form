'use strict';

var fs = require('fs');
var path = require('path');
var uuid = require('uuid');

var usersFilePath = path.join(__dirname, '../data/users.json');

exports.get = function(cb) {
  fs.readFile(usersFilePath, function(err, data) {
    if(err) return cb(err);
    var users = JSON.parse(data);
    cb(null, users);
  });
};

exports.create = function(newUser, cb) {
  this.get((err, users) => {
    if(err) return cb(err);
    newUser.id = uuid();
    console.log(newUser.id);
    users.push(newUser);
    this.write(users, function(err) {
      cb(err, newUser);
    });
  });
};

exports.write = function(users, cb) {
  fs.writeFile(usersFilePath, JSON.stringify(users), cb);
};
