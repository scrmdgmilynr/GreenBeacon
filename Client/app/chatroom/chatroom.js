  angular.module('app.chatroom', ['app.student'])
.controller('ChatroomController', ['$scope', 'Tickets', 'Auth', 'params', '$http', 'loading', 'checkStatus', '$location', function($scope, Tickets, Auth, params, $http, loading, checkStatus, $location){  
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

  socket.on('otherTyping', (data) => {
    if (data !== cookie.user.mainId) {
      console.log('someone typing');
    }
  });
  
  //Post request to save ticket; server response will return all messages
  var getChatroom = (data) => {
    return $http({
      method: 'POST',
      url: '/chatroom/',
      data: data
    })
    .then((resp) => {
      $scope.loading = '';
    	$scope.chatroom = resp.data;      
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
      console.log("messages saved!");
      socket.emit('messageAdd');
    })
    .catch((err) => {     
     console.log(err);
    });    
  };  

  getChatroom($scope.ticketID);
  
  $scope.saveChat = function() { 
    console.log("cookie.user.mainId", cookie.user.mainId);
    $scope.messageObj = {
      message: $scope.message,
      ticketId: params.ticket.id,
      userId: cookie.user.mainId
    }
    saveChatMessage($scope.messageObj)
    $scope.message = '';
  } 

  $scope.typing = function() {
    socket.emit('typing', cookie.user.mainId);
  }

}]);