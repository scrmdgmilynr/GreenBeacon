  angular.module('app.chatroom', ['app.student'])
.controller('ChatroomController', ['$scope', 'Tickets', 'Auth', 'params', '$http', 'loading', 'checkStatus', '$location', 'getMessages', function($scope, Tickets, Auth, params, $http, loading, checkStatus, $location, getMessages){	
	const cookie = JSON.parse(document.cookie.substr(document.cookie.indexOf('; ') + 1));
  
  if(params.ticket === undefined){
    console.log(checkStatus);
    $location.path(checkStatus.check(cookie));
  }

  $scope.chatroom = [];
  $scope.ticketID = {ticketId: params.ticket.id};
  $scope.messageObj = {};  
  $scope.loading = loading.loading;

  socket.on('messageAdded', () =>{
    getChatroom($scope.ticketID);
  });

  // socket.on('otherTyping', () => {
  //   console.log('someone typing');
  // });
	
  //Post request to save ticket; server response will return all messages
  getMessages.getChatroom($scope.ticketID, (resp) =>{
    $scope.loading = '';
    $scope.chatroom = resp.data;      
    socket.emit('messageAdd');
  });

 //  //Post request to save each message
	// var saveChatMessage = (data) => {    
 //    return $http({
 //      method: 'POST',
 //      url: '/chatroom/chat',
 //      data: data
 //    })
 //    .then((resp) => {
 //      console.log("messages saved!");
 //      getChatroom($scope.ticketID);
 //    })
 //    .catch((err) => {     
 //     console.log(err);
 //    });    
 //  };  
  
  // $scope.saveChat = function() { 
  //   console.log("cookie.user.mainId", cookie.user.mainId);
  //   $scope.messageObj = {
  //     message: $scope.message,
  //     ticketId: params.ticket.id,
  //     userId: cookie.user.mainId
  //   }
  //   saveChatMessage($scope.messageObj)
  //   $scope.message = '';
  // } 

  // $scope.typing = function() {
  //   socket.emit('typing');
  // }

}]);