'use strict';

var app = angular.module('formApp');

app.controller('formCtrl', function($scope) {
  $scope.passwordRegex = /(?=.​*[0-9])(?=.*​[a-z])(?=.*[A-Z]).{6,}/;

  $scope.submitUserForm = function(formInvalid) {
    if(formInvalid) {
      console.log('form invalid');
    } else {
      console.log('submit:', $scope.user);
    }
  };

  // $scope.regex = '/[a-z][A-Z]\d1*/g'
});
