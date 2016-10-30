angular.module('app.chatroom', ['app.student'])
.controller('ChatroomController', ['$scope', '$timeout', 'Tickets', 'Auth', 'params', '$http', 'loading', 'checkStatus', '$location', function($scope, $timeout, Tickets, Auth, params, $http, loading, checkStatus, $location){
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

  $scope.sniptMsg = {
    msg: '',
    cl: 'hidden'
  }

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
      }, 1000);
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
      $scope.sniptMsg = {
        msg:'Click the code area to edit, when finished click submit.', 
        cl: 'show'
      }
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

  var initText = "// Drag javascript file into code area or start typing!";
  var defaultMode = "javascript";

  if(window.localStorage[`myEditor${params.ticket.id}`] !== undefined) {
    initText = window.localStorage[`myEditor${params.ticket.id}`];
  }

  var editor = new CodeMirror(document.getElementById("codeArea"),
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

  window.localStorage[`myEditor${params.ticket.id}`] = editor.getValue();

  editor.on('change', function() {
      window.localStorage[`myEditor${params.ticket.id}`] = editor.getValue();
      console.log(window.localStorage[`myEditor${params.ticket.id}`]);
  });

  $scope.submitCode = function() {
    console.log('submitted');
    socket.emit('codeChange', window.localStorage[`myEditor${params.ticket.id}`], cookie.user.mainId);
    $scope.sniptMsg.msg = 'Code sending...';
  }

  socket.on('codeReceived', (code, id) => {
    if (id !== cookie.user.mainId) {
      console.log('code: ', code);
      window.localStorage[`myEditor${params.ticket.id}`] = code;
      editor.setValue(code);
      $scope.sniptMsg.msg = 'Code recieved!'
      socket.emit('codeRecieved')
      // Sets cursor to end of doc after edit...develop live edit later.
      // $scope.editor.setCursor($scope.editor.lineCount(), 0);
    }else{
      $scope.sniptMsg.msg = 'Code sent!';
      $scope.$digest();
      $timeout(() =>{
        $scope.sniptMsg.msg = 'Click the code area to edit, when finished click submit.'
      }, 3000)
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
