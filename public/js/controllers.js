'use strict';

var app = angular.module('myApp');

app.controller('mainCtrl', function($scope, $http) {
  $scope.users = [];
  $scope.ccRegex = /^(\d\s*){14,16}$/;
  $scope.phoneRegex = /\d{3}[\-]\d{3}[\-]\d{4}/;
  $scope.zipRegex = /(\d{5})/;
  $scope.cvvRegex = /(\d{3})/;
  $scope.expRegex = /(\d{4})/;
  $scope.passwordRegex = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}/;

  $scope.cardChange = function() {
    var credit = $scope.user.credit;
    if(!credit) return;
    console.log($scope.user.credit);
    if(credit.length > 16) {
      $scope.cardValid = false;
      }
    var multiply = 1, sum = 0;

    for (var i = 0; i < credit.length; i++) {
      var number = credit.substring((credit.length - i) - 1, credit.length - 1);
      var total = parseInt(number, 10) * multiply;
      if(total >=10) {
        sum += (total % 10) + 1;
      } else {
        sum += total;
      }
      if( multiply == 1) {
        multiply++
      } else {
        --multiply;
      }
      if ((sum % 10) == 0) {
        $scope.cardValid = true;
        console.log('true', $scope.cardValid);
      } else {
        $scope.cardValid = false;
        console.log('false', $scope.cardValid);
        return;
        }
      }
    }

  $scope.submitUserForm = function(formInvalid) {
    console.log('hehehe');
    // if(formInvalid || !$scope.cardValid) {
    if(formInvalid) {
      console.log('form invalid');
      swal("Your form is invalid");
      $scope.user = {};
    } else {
      console.log('submit:', $scope.user);
      $scope.addUser();
      $scope.user = {};
    }
  };

  $http({
    method: "GET",
    url: "/users"
    }).then(function(response) {
      $scope.users = response.data;
    }, function(error) {
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
      console.error(err);
    })
    $scope.user = {};
  }
  console.log($scope.users);

})
