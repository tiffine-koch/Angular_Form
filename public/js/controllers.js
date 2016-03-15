'use strict';

var app = angular.module('myApp');

app.controller('mainCtrl', function($scope, $http) {
  $scope.users = [];
  // console.log($scope.users);
  $scope.ccRegex = /(\d\s*){14,16}/;
  $scope.phoneRegex = /\d{3}[\-]\d{3}[\-]\d{4}/;
  $scope.zipRegex = /(\d{5})/;
  $scope.cvvRegex = /(\d{3})/;
  $scope.expRegex = /(\d{4})/;
  $scope.passwordRegex = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  //put into ng-patter for messages
  $scope.cardChange = function() {
    var credit = $scope.user.credit;
    console.log($scope.user.credit);
    //validation
    if(credit.length > 19) {
      $scope.cardValid = false;
        // return false;
      }
    var multiply = 1, sum = 0;

    for (var i = 0; i < credit.length; i++) {
      var number = credit.substring((credit.length - i) - 1, credit.length - 1);
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
        // return true;
        console.log('true', $scope.cardValid);
        $scope.cardValid = true;
      } else {
        // return false;
        console.log('false', $scope.cardValid);
        $scope.cardValid = false;
      }
    }
  }

  $scope.submitUserForm = function(formInvalid) {
    console.log('hehehe');
    if(formInvalid || !valid) {
      console.log('form invalid');
      swal("Your form is invalid");
    } else {
      console.log('submit:', $scope.user);
    }
  };

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


})
