angular.module('app.chatroom', ['app.student'])
.controller('ChatroomController', ['$scope', 'Tickets', 'Auth', 'params', '$http', function($scope, Tickets, Auth, params, $http){	
	$scope.ticket = params.ticket.id;	
	$scope.chatroom = [{
		message: "hello",
		// id
	}, {
		message: "how are ",
	}, {
		message: "hello",
	}];
	
	$scope.ticketFunc = function (){
		return $scope.ticket;
	};
	
	var getChatroom = (data) => {
    return $http({
      method: 'POST',
      url: '/chatroom/',
      data: data
    })
    .then((resp) => {
    	$scope.chatroom = resp;
    })
    .catch((err) => {
      console.log(err);
    });    
  };

  getChatroom({'ticketId': 1});

}]);