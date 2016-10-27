angular.module('app.chatroom', ['app.student'])
.controller('ChatroomController', ['$scope', 'Tickets', 'Auth', 'params', function($scope, Tickets, Auth, params){	
	$scope.ticket = params.ticket.id;	
	$scope.chatroom = {};
	
	$scope.ticketFunc = function (){
		return $scope.ticket;
	}
	
	var getChatroom = (data) => {
    return $http({
      method: 'POST',
      url: '/chatroom/',
      data: data
    })
    .then((resp) => {
    	$scope.chatroom = resp;
      console.log(resp);
    })
    .catch((err) => {
      console.log(err);
    });    
  }

  getChatroom({id: 2});

}]);