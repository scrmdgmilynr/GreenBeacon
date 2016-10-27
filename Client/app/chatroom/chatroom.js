angular.module('app.chatroom', ['app.student'])
.controller('ChatroomController', ['$scope', 'Tickets', 'Auth', 'params', '$http', function($scope, Tickets, Auth, params, $http){	
	$scope.chatroom = [];
  $scope.ticketID = {ticketId: params.ticket.id};
  $scope.messageObj = {};  
	
  //Post request to save ticket; server response will return all messages
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
	
  //Post request to save each message
	var saveChatMessage = (data) => {    
    return $http({
      method: 'POST',
      url: '/chatroom/chat',
      data: data
    })
    .then((resp) => {
      console.log(resp);
    })
    .catch((err) => {     
     console.log(err);
    });    
  };  

  getChatroom($scope.ticketID);
  
  $scope.saveChat = function() {    
    $scope.messageObj = {
      message: $scope.message,
      ticketId: params.ticket.id,
      // userId: //will come from token
    }
    saveChatMessage($scope.messageObj)
    $scope.message = '';
  }    
}]);