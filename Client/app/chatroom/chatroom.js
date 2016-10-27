angular.module('app.chatroom', ['app.student'])
.controller('ChatroomController', ['$scope', 'Tickets', 'Auth', 'params', function($scope, Tickets, Auth, params){	
	$scope.ticket = params.ticket.id;	
	$scope.chatroom = {};
	
	$scope.ticketFunc = function (){
		return $scope.ticket;
	}
	
	var getChatroom = () => {
    return $http({
      method: 'POST',
      url: '/chatroom',
      data: $scope.ticket
    })
    .then((resp) => {
    	$scope.chatroom = resp;
    })
    .catch((err) => {
      console.log(err);
    });    
  }

}]);