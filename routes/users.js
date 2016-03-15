'use strict';

var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.get('/', function(req, res) {
  User.get(function(err, users) {
    if(err) {
      res.status(400).send(err);
      return;
    }
    res.send(users);
  });
});

router.post('/', function(req, res) {
  var newUser = req.body;
  User.create(newUser, function(err) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send(newUser);
    }
  });
});

module.exports = router;
