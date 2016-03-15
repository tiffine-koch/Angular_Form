'use strict';

var app = angular.module('myApp');

app.controller('mainCtrl', function($scope, $http) {
  $scope.passwordRegex = /(?=.​*[0-9])(?=.*​[a-z])(?=.*[A-Z]).{6,}/;

  $scope.users = [];
  console.log($scope.users);

  $http({
    method: "GET",
    url: "/users"
  }).then(function(response){
    $scope.users = response.data;
  }, function(error){
  });

  $scope.addUser = function() {
    console.log('click');
    var user = angular.copy($scope.user);
    console.log(user);
    $scope.users.push(user);
    $http({
      method: 'POST',
      url: '/users',
      data: user
    }).then(function(response){
      swal("Your information has been uploaded!");
    }, function(error){
    })
    $scope.user = {};
  }
  console.log($scope.users);

  $scope.submitUserForm = function(formInvalid) {
    console.log('hehehe');
    if(formInvalid) {
      console.log('form invalid');
    } else {
      console.log('submit:', $scope.user);
    }
  };

  $scope.submitCC = function(credit) {
    if(credit.length > 19) {
        return false;
      }
    var multiply = 1, sum = 0;

    for (var i = 0; i < credit.length; i++) {
      var number = credit.substring(credit.length - i - 1, credit.length - 1);
      var total = parseInt(number, 10) * multiply;
      if(total >=10) {
        sum += (total % 10) + 1;
      } else {
        sum += total;
      } if( multiply == 1) {
        multiply++
      } else {
        --multiply;
      } if ((sum % 10) == 0) {
        return true;
      } else {
        return false;
      }
    }
  }
});
