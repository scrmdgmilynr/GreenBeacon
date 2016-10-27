// chatroom.js
angular.module('app.chatroom', ['app.student'])
.controller('ChatroomController', ['$scope', 'Tickets', 'Auth', 'params', '$http', function($scope, Tickets, Auth, params, $http){	
	$scope.ticketID = {ticketId: params.ticket.id};
	console.log("chatroom ticket", $scope.ticket);
	$scope.chatroom = [];
	
	var getChatroom = (data) => {
    return $http({
      method: 'POST',
      url: '/chatroom/',
      data: data
    })
    .then((resp) => {
    	$scope.chatroom = resp.data;      
      console.log(resp);
    })
    .catch((err) => {
      console.log(err);
    });    
  };
	
	// var getChatroom = (data) => {
 //    return $http({
 //      method: 'POST',
 //      url: '/chatroom/chat',
 //      data: data
 //    })
 //    .then((resp) => {
 //    	$scope.chatroom = resp.data;      
 //      console.log(resp);
 //    })
 //    .catch((err) => {
 //      console.log(err);
 //    });    
 //  };  

  getChatroom($scope.ticketID);

}]);