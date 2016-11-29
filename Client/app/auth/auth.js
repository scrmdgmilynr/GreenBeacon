//Signin controller
angular.module('app.auth', [])
.controller('AuthController', ['$scope', 'Auth', 'guestLogin', '$location', function ($scope, Auth, guestLogin, $location) {
//Signin function attached to scope
  $scope.signin = function() {
    //Triggers signin from Auth factory
    Auth.signin();
  };

  $scope.guestLoginStudent = () =>{
    new Promise((resolve, reject) =>{
      guestLogin.setGuestInfo(() =>{
        resolve();
      });
    })
    .then(() =>{
      console.log('hello')
      $location.path('/student');
    })
    .catch((err) =>{
      console.log(err);
    });
  };

  $scope.guestLoginFellow = () =>{
    new Promise((resolve, reject) =>{
      guestLogin.setGuestInfo(() =>{
        resolve();
      });
    })
    .then(() =>{
      $location.path('/fellow');
    })
    .catch((err) =>{
      console.log(err);
    });
  };
}]);
