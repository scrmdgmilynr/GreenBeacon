//Signin controller
angular.module('app.addfellow', [])
.controller('AddFellowController', ['$scope', 'Tickets', 'Auth', '$interval', 'params', '$location', 'loading', '$http', function($scope, Tickets, Auth, $interval, params, $location, loading, $http){
	const cookie = JSON.parse(document.cookie.substr(document.cookie.indexOf('; ') + 1));
	if(!cookie.user.fellow) $location.path('student');
	
	$scope.message = { 
		msg: 'Add New Fellow',
		cl: 'show'
	};

	$scope.addFellow = function() {
		$scope.message = { 
			msg: 'Adding Fellow',
			cl: 'show'
		};

		var name = $scope.fullName;
		var handle = $scope.gitHandle;

		var fellowObj = {
			name: $scope.fullName,
			handle: $scope.gitHandle
		};

		$http({
			method: 'POST',
			url: '/addFellow',
			data: fellowObj
		}).then((resp) =>{
			$scope.fullName = '';
			$scope.gitHandle = '';

			if(resp){
				$scope.message = { 
					msg: 'Add New Fellow',
					cl: 'show'
				};
			}
		})
	};

	$scope.hideMsg = function() {
		$scope.message = {
			msg
		}
	};

	$scope.signout = function () {
    Auth.signout();
  };

  $scope.backToFellow = function() {
    $location.path('fellow');
  };

}]);
