//Signin controller
angular.module('app.auth', [])
.controller('AuthController', ['$scope', 'Auth', 'guestLogin', '$location', function ($scope, Auth, guestLogin, $location) {
//Signin function attached to scope
  $scope.signin = function() {
    //Triggers signin from Auth factory
    Auth.signin();
  };

  $scope.guestLoginStudent = () =>{
    console.log('hello')
    guestLogin.setGuestInfo();
    $location.path('/student');
  };
  $scope.guestLoginFellow = () =>{
    console.log('hello')
    guestLogin.setGuestInfo();
    $location.path('/fellow');
  };
}]);
