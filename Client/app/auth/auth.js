//Signin controller
angular.module('app.auth', [])
.controller('AuthController', ['$scope', 'Auth', 'guestLogin', '$location', function ($scope, Auth, guestLogin, $location) {
//Signin function attached to scope
  $scope.signin = function() {
    //Triggers signin from Auth factory
    Auth.signin();
  };

  $scope.guestLoginStudent = () =>{
    guestLogin.setGuestInfo();
    $location.path('/student');
  };

  $scope.guestLoginFellow = () =>{
    guestLogin.setGuestInfo();
    $location.path('/fellow');
  };
}]);
