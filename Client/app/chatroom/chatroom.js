angular.module('app.chatroom', ['app.student'])
.controller('ChatroomController', ['$scope', 'Tickets', 'Auth', 'params', '$http', 'loading', 'checkStatus', '$location', function($scope, Tickets, Auth, params, $http, loading, checkStatus, $location){
  const cookie = JSON.parse(document.cookie.substr(document.cookie.indexOf('; ') + 1));

  if(params.ticket === undefined){
    console.log(checkStatus);
    $location.path(checkStatus.check(cookie));
  }

  console.log(params.ticket, ' ticket')
  $scope.chatroom = [];
  $scope.ticketID = {ticketId: params.ticket.id};
  $scope.ticket = params.ticket;
  $scope.messageObj = {};
  $scope.loading = loading.loading;
  $scope.code = '';

  // var updateScroll = (element) =>{
  //   console.dir(element.scrollTop, 'before')
  //   element.scrollTop = element.scrollHeight + 1000;
  //   console.dir(element.scrollTop, 'after')
  // };

  socket.on('messageAdded', () =>{
    console.log('messageAdded')
    getChatroom($scope.ticketID);
  });

  socket.on('otherTyping', (data) => {
    if (data !== cookie.user.mainId) {
      document.getElementById('gif').style.display = 'block';
      setTimeout(() => {
        document.getElementById('gif').style.display = 'none';
      }, 750);
    }
  });

  socket.on('changedCode', (data) => {
    $scope.code = data;
  });

  //Post request to save ticket; server response will return all messages
  var getChatroom = (data) => {
    return $http({
      method: 'POST',
      url: '/chatroom/',
      data: data
    })
    .then((resp) => {
      console.log('resp', resp)
      $scope.loading = '';
      resp.data.forEach(function(item) {
        item.createdAtUpdate = moment(item.createdAt).startOf('minute').fromNow();
        item.updatedAtUpdate = moment(item.updatedAt).startOf('hour').fromNow();
      });
    	$scope.chatroom = resp.data;
      // $scope.$digest();
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
      socket.emit('messageAdd', params.ticket.id);
    })
    .catch((err) => {
     console.log(err);
    });
  };

  getChatroom($scope.ticketID)

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

  $scope.codeChange = function() {
    socket.emit('codeChange', $scope.code);
  }

  $scope.backToTickets = function() {
    $location.path(checkStatus.check(cookie));
  }

  var initText = "";
  var defaultMode = "javascript";

  if(window.localStorage.myEditor !== undefined) {
    initText = window.localStorage.myEditor;
  }

  $scope.editor = new CodeMirror(document.getElementById("codeArea"),
    {
      value: initText,
      theme: 'monokai',
      autoCloseBrackets: true,
      lineNumbers: true,
      tabSize: 2,
      mode: 'javascript',
      smartIndent: true,
      autofocus: true,
    });

  window.localStorage.myEditor = $scope.editor.getValue();

  $scope.editor.on('change', function() {
    window.localStorage.myEditor = $scope.editor.getValue();
    socket.emit('snippetChanged', window.localStorage.myEditor, cookie.user.mainId);
  });

  socket.on('snippetAdded', (data, id) => {
    if (id !== cookie.user.mainId) {
      console.log('User changing snippet.');
      window.localStorage.myEditor = data;
      $scope.editor.setValue(data);
    } else {
      console.log('I am me.');
    }
  });

  $scope.checkId = (chat) =>{
    if(cookie.user.username === chat.username){
      return 'userMe';
    }else {
      return 'userOther';
    }
  }

  $scope.signout = function () {
    Auth.signout();
  }

}])
