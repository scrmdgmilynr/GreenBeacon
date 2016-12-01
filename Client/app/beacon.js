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
    if(guestInfo.user.guestLogin){
      guestSignOut.restGuestInfo();
    }else{
      Auth.signout();
    }

    $location.path('/signin');
  };

  $scope.backToFellow = function() {
    $location.path('fellow');
  };

}]);
;//initialize app module, include services and auth dependencies

angular.module('app', ['app.auth', 'app.queue', 'app.services', 'app.student', 'app.chatroom', 'app.addfellow', 'ngRoute', 'ngSanitize'])

.config(function($routeProvider){

	$routeProvider
		.when('/signin', {
			templateUrl: 'app/auth/signin.html',
			controller: 'AuthController'
		})
		.when('/student', {
			templateUrl: 'app/student/student.html',
			controller: 'StudentController'
		})
		.when('/fellow', {
			templateUrl: 'app/fellow/fellow.html',
			controller: 'FellowController'
		})
		.when('/chatroom', {
			templateUrl: 'app/chatroom/chatroom.html',
			controller: 'ChatroomController'
		})
		.when('/addfellow', {
			templateUrl: 'app/addfellow/form.html',
			controller: 'AddFellowController'
		})
		.otherwise({
			redirectTo: '/signin'
		});

});
;//Signin controller
angular.module('app.auth', [])
.controller('AuthController', ['$scope', 'Auth', 'guestLogin', '$location', function ($scope, Auth, guestLogin, $location) {
//Signin function attached to scope
  $scope.signin = function() {
    //Triggers signin from Auth factory
    Auth.signin();
  };

  $scope.guestLoginStudent = () =>{
    guestLogin.setGuestInfo();
    $location.path('/student');
  };

  $scope.guestLoginFellow = () =>{
    guestLogin.setGuestInfo();
    $location.path('/fellow');
  };
}]);
;//Signin controller
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
    if(guestInfo.user.guestLogin){
      guestSignOut.restGuestInfo();
    }else{
      Auth.signout();
    }

    $location.path('/signin');
  };

  $scope.backToFellow = function() {
    $location.path('fellow');
  };

}]);
;//initialize app module, include services and auth dependencies

angular.module('app', ['app.auth', 'app.queue', 'app.services', 'app.student', 'app.chatroom', 'app.addfellow', 'ngRoute', 'ngSanitize'])

.config(function($routeProvider){

	$routeProvider
		.when('/signin', {
			templateUrl: 'app/auth/signin.html',
			controller: 'AuthController'
		})
		.when('/student', {
			templateUrl: 'app/student/student.html',
			controller: 'StudentController'
		})
		.when('/fellow', {
			templateUrl: 'app/fellow/fellow.html',
			controller: 'FellowController'
		})
		.when('/chatroom', {
			templateUrl: 'app/chatroom/chatroom.html',
			controller: 'ChatroomController'
		})
		.when('/addfellow', {
			templateUrl: 'app/addfellow/form.html',
			controller: 'AddFellowController'
		})
		.otherwise({
			redirectTo: '/signin'
		});

});
;//Signin controller
angular.module('app.auth', [])
.controller('AuthController', ['$scope', 'Auth', 'guestLogin', '$location', function ($scope, Auth, guestLogin, $location) {
//Signin function attached to scope
  $scope.signin = function() {
    //Triggers signin from Auth factory
    Auth.signin();
  };

  $scope.guestLoginStudent = () =>{
    guestLogin.setGuestInfo();
    $location.path('/student');
  };

  $scope.guestLoginFellow = () =>{
    guestLogin.setGuestInfo();
    $location.path('/fellow');
  };
}]);
;angular.module('app.chatroom', ['app.student'])
.controller('ChatroomController', ['$scope', '$timeout', 'Tickets', 'Auth', 'params', '$http', 'loading', 'checkStatus', '$location', 'guestInfo', 'guestSignOut', function($scope, $timeout, Tickets, Auth, params, $http, loading, checkStatus, $location, guestInfo, guestSignOut){
  let cookie;

  if(guestInfo.user.guestLogin){
    cookie = guestInfo;
  }else {
    cookie = JSON.parse(document.cookie.substr(document.cookie.indexOf('; ') + 1));
  }

  if(params.ticket === undefined){
    console.log(checkStatus);
    $location.path(checkStatus.check(cookie));
  }

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
    getChatroom($scope.ticketID);
  });

  socket.on('otherTyping', (data) => {
    if (data !== cookie.user.mainId) {
      $('#gif').css('visibility', 'visible');
      _.debounce(setTimeout(()=> {
        $('#gif').css('visibility', 'hidden')
      }, 1000), 3000);
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
      $scope.loading = '';
      $scope.sniptMsg = {
        msg:'Click the code area to edit, when finished click submit.',
        cl: 'alert alert-info'
      }

      resp.data.forEach(function(item) {
        item.createdAtUpdate = moment(item.createdAt).startOf('minute').fromNow();
        item.updatedAtUpdate = moment(item.updatedAt).startOf('hour').fromNow();
        // var url = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        // var url =  [-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*);
        var url = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
        var regex = new RegExp(url);
        var m = item.message;

        console.log("regext message: ", m.match(regex));

        if (m.match(regex)) {
          console.log("Successful match:", item);
          if((m.match(regex)[0].slice(0,4) !== "http") && (m.match(regex)[0].slice(0,4) !== "www.") && ((m.match(regex)[0].slice(0,4) !== ".com") || (m.match(regex)[0].slice(-4) !== ".co"))){
            item.url= "http://www." + m.match(regex)[0];
          } else if ((m.match(regex)[0].slice(0,4) === "www.") && ((m.match(regex)[0].slice(0,4) !== ".com") || (m.match(regex)[0].slice(-4) !== ".co"))){
            item.url= "http://" + m.match(regex)[0];
          } else {
            item.url=  m.match(regex)[0];
          }
        } else {
          console.log("No match");
        }
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

  // // emoji selector
  // $('#messageinput').emojiPicker({
  //   width: '300px',
  //   height: '200px',
  //   button: false
  // });

  // $('#trigger').click(function(e) {
  //   e.preventDefault();
  //   $('#messageinput').emojiPicker('toggle');
  // });

  $scope.typing = function() {
    socket.emit('typing', cookie.user.mainId);
  }

  $scope.codeChange = function() {
    socket.emit('codeChange', $scope.code);
  }

  $scope.backToTickets = function() {
    $location.path(checkStatus.check(cookie));
  }

  var initText = "// Drag javascript file into code area or start typing! \n";
  var defaultMode = "javascript";

  if(window.localStorage[`myEditor${params.ticket.id}`] !== undefined) {
    initText = window.localStorage[`myEditor${params.ticket.id}`];
  }

  var foldFunc = () => {
    CodeMirror.newFoldFunction(CodeMirror.braceRangeFinder);
  };

  var editor = new CodeMirror (document.getElementById("codeArea"),
    {
      value: initText,
      theme: 'monokai',
      autoCloseBrackets: true,
      autoCloseTags: true,
      lineNumbers: true,
      tabSize: 2,
      mode: 'javascript',
      smartIndent: true,
      autofocus: true,
      foldGutter: true,
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    });

  // todo: Figure out why gutter click does not fold text.
  editor.on('gutterClick', foldFunc);

  console.log('editor options: ', editor);

  if (initText === "// Drag javascript file into code area or start typing! \n") {
    editor.setCursor({line: 2, ch:0});
  }


  window.localStorage[`myEditor${params.ticket.id}`] = editor.getValue();

  editor.on('change', function() {
      window.localStorage[`myEditor${params.ticket.id}`] = editor.getValue();
  });

  $scope.submitCode = function() {
    socket.emit('codeChange', window.localStorage[`myEditor${params.ticket.id}`], cookie.user.mainId);
    $scope.sniptMsg.msg = 'Code sending...';
  }

  socket.on('codeReceived', (code, id) => {
    if (id !== cookie.user.mainId) {
      window.localStorage[`myEditor${params.ticket.id}`] = code;
      editor.setValue(code);
      $scope.sniptMsg.msg = 'Code recieved!'
      $scope.sniptMsg.cl = 'alert alert-success';
      socket.emit('codeRecieved')
      $timeout(() =>{
        $scope.sniptMsg.msg = 'Click the code area to edit, when finished click submit.'
        $scope.sniptMsg.cl = 'alert alert-info';
      }, 3000)
      // Sets cursor to end of doc after edit...develop live edit later.
      // $scope.editor.setCursor($scope.editor.lineCount(), 0);
    }else{
      $scope.sniptMsg.msg = 'Code sent!';
      $scope.sniptMsg.cl = 'alert alert-success';
      $scope.$digest();
      $timeout(() =>{
        $scope.sniptMsg.msg = 'Click the code area to edit, when finished click submit.'
        $scope.sniptMsg.cl = 'alert alert-info';
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

  $scope.signout = function ($location) {
    if(guestInfo.user.guestLogin){
      guestSignOut.restGuestInfo();
    }else{
      Auth.signout();
    }

    $location.path('/signin');
  }

}])
;angular.module('app.queue', [])

.controller('FellowController', ['$scope', 'Tickets', 'Auth', 'params', '$location', 'loading', 'guestInfo', 'guestSignOut', function($scope, Tickets, Auth, params, $location, loading, guestInfo, guestSignOut){

  let cookie;

  if(guestInfo.user.guestLogin){
    cookie = guestInfo;
  }else {
    cookie = JSON.parse(document.cookie.substr(document.cookie.indexOf('; ') + 1));
    if(!cookie.user.fellow) $location.path('student');
  }

  console.log(cookie, ' fellow log')

  $scope.data = {};
  var SVGpulse;
  var SVGdot;
  $scope.loading = loading.loading;

  socket.on('ticketChange', () =>{
    initializeQueue();
  });

  socket.on('messageAdded', (data) => {
    console.log(data);
    console.log(document.getElementById(data.toString()));
    if (document.getElementById(data.toString())) {
      document.getElementById(data.toString()).style.display = 'block';
      console.log(data);
    }
  });

  var initializeQueue = function(cb) {
    //retrieve tickets from database
    Tickets.getTickets()
      .then(function(results){

        SVGpulse = document.getElementsByClassName('pulse');
        SVGdot = document.getElementsByClassName('dot');

        //add tickets to the scope
        $scope.data.tickets = results.data.tickets;
        var tickets = $scope.data.tickets;

        //set claims to the scope
        $scope.data.claims = results.data.claims;

        //iterate through all tickets
        for (var ticket of $scope.data.tickets) {
          //if the userId of the ticket matches the current session user
          ticket.createdAt = moment(ticket.createdAt).startOf('minute').fromNow();
          if (ticket.userId === results.data.userID) {
            //add and set isMine attribute to true
            ticket.ismine = true;
          } else {
            ticket.ismine = false;
          }
        }


        //iterate through all claims
        for (var claim of $scope.data.claims) {
          //if the helpee (user) id of the claim matches the current session user
          if (claim.helpeeId === results.data.userID) {
            //alert the helpee and include the name of the user who claimed the ticket

            for (var ticket of $scope.data.tickets) {
              //if the ticket's claimed attribute is true and the user of the claimed ticket matches the current session user
                //set the ticket's preSolved state to true
              if (ticket.claimed && ticket.userId === results.data.userID) {
                ticket.preSolved = true;
              }
            }
            //Delete the claim from the database
            Tickets.eraseClaim(claim)
            .then(function () {
              //wipe out client-side claims object
               $scope.data.claims = {};
            })
          }
        }
        if(cb) cb();
      })
      .catch(function(error){
        console.error(error);
      });
  }

  $scope.ticket = {};

  // MAPPPPPPPP
  // $scope.addTicket = function () {

  // //assign random color for each ticket's dot
  // function getRandomColor() {
  //   var letters = '0123456789ABCDEF'.split(''),
  //       color = '#';
  //   for(var i = 0; i < 6; i++ ) {
  //       color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // };

  // $scope.ticket.color =  getRandomColor();

  // if ($scope.ticket.location === 'Lecture Hall') {
  //   $scope.ticket.x = Math.random() * 165 + 25;
  //   $scope.ticket.y = Math.random() * 50 + 50;

  // } else if ($scope.ticket.location === 'Pairing Station') {
  //   $scope.ticket.x = Math.random() * 165 + 25;
  //   $scope.ticket.y = Math.random() * 70 + 140;

  // } else if ($scope.ticket.location === 'Kitchen') {
  //   $scope.ticket.x = Math.random() * 165 + 25;
  //   $scope.ticket.y = Math.random() * 80 + 240;

  // } else if ($scope.ticket.location === 'Couch') {
  //   $scope.ticket.x = Math.random() * 120 + 250;
  //   $scope.ticket.y = Math.random() * 95 + 230;

  // } else if ($scope.ticket.location === 'Senior Zone') {
  //   $scope.ticket.x = Math.random() * 100 + 270;
  //   $scope.ticket.y = Math.random() * 240 + 370;

  // } else if ($scope.ticket.location === 'The Hopper') {
  //   $scope.ticket.x = Math.random() * 135 + 25;
  //   $scope.ticket.y = Math.random() * 80 + 470;

  // } else if ($scope.ticket.location === 'The Dijkstra') {
  //   $scope.ticket.x = Math.random() * 135 + 25;
  //   $scope.ticket.y = Math.random() * 65 + 590;

  // } else if ($scope.ticket.location === 'The Ada') {
  //   $scope.ticket.x = Math.random() * 80 + 290;
  //   $scope.ticket.y = Math.random() * 105 + 655;

  // } else if ($scope.ticket.location === 'Entrance Hall') {
  //   $scope.ticket.x = Math.random() * 235 + 25;
  //   $scope.ticket.y = Math.random() * 70 + 690;
  // }

  // //retrieve new ticket from html form, pass to add Ticket function
  // Tickets.addTicket($scope.ticket)
  //   .then(function () {
  //     $scope.ticket = {};
  //     initializeQueue();
  //   })
  //   .catch(function (err) {
  //     console.log(err);
  //   });
  // }

  $scope.signout = function ($location) {
    if(guestInfo.user.guestLogin){
      guestSignOut.restGuestInfo();
    }else{
      Auth.signout();
    }

    $location.path('/signin');
  };

  $scope.claimTicket = function (ticket) {

    //once 'claim' has been clicked'
      //pass the claimed ticket to claim Ticket service
    Tickets.claimTicket(ticket)
      .then(function () {
        initializeQueue();
      })
      .catch(function (err) {
        console.log(err);
      });

  }

  $scope.solveTicket = function (ticket) {

    //if 'Solved' has been clicked on the ticket, pass that ticket into solveTicket service
     Tickets.solveTicket(ticket)
       .then(function () {
         initializeQueue();
       })
       .catch(function (err) {
         console.log(err);
       });
  }


  $scope.unsolveTicket = function (ticket) {

    //if 'Not Solved' is clicked, pass the ticket to unsolveTicket service
     Tickets.unsolveTicket(ticket)
      .then(function () {
        initializeQueue();
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  initializeQueue(() =>{
    $scope.loading = '';
  });


  //functionality: on hover of ticket, hide all dots that do not match ticket's x and y coordinates
  // $scope.showDot = function (ticketX, ticketY) {

  //   //iterate through all dots
  //   for (var i = 0; i < SVGdot.length; i++) {
  //     //find each dot's x and y coordinates
  //     var x = SVGdot[i].parentElement.parentElement.getAttribute('x');
  //     var y = SVGdot[i].parentElement.parentElement.getAttribute('y');

  //     //given the x and y coordinates of the ticket (ticketX, ticketY, if the dot and the ticket coordinates do NOT match, add class 'hidden' to dot.
  //     if (x !== ticketX.toString() && y !== ticketY.toString()) {
  //       SVGpulse[i].setAttribute('class', 'pulse hiddenPulse');
  //       SVGdot[i].setAttribute('class', 'dot hiddenDot');
  //     }
  //   }
  // }

  $scope.getTicket = function(ticket) {
    console.log(ticket);
    params.ticket = ticket;
    $location.path('chatroom');
  };

  $scope.sendToForm = function() {
    $location.path('addfellow');
  };

}]);
;angular.module('app.services', [])

//Tickets factory - handles all tickets manipulations
.factory('Tickets', ['$http', '$window', function ($http, $window) {

  //Sends GET request to the server in order to render tickets
  var getTickets = function () {
    return $http({
      method: 'GET',
      url: '/tickets'
    })
    .then(function (resp) {
      if (resp.data === 'failed') {
        //Redirects to signing if authentication fails
        $window.location = '/#/signin';
      }

      return resp;
    });
  };

  var getUserTickets = function (user) {
    console.log(user, ' user object')
    return $http({
      method: 'GET',
      url: `/tickets/${user.mainId}`
    })
    .then(function (resp) {
      if (resp.data === 'failed') {
        //Redirects to signing if authentication fails
        $window.location = '/#/signin';
      }

      return resp;
    });
  };

  //Get one ticket from the database
  var getTicket = function (ticketId) {
    console.log(ticketId);
    return $http({
      method: 'POST',
      url: `/ticket/${ticketId}`,
    })
    .then((resp) =>{
      return resp;
    });
  };

  //Sends POST request to the server in order to post a new ticket
  var addTicket = function (ticket) {
    console.log(ticket)
    ticket.guestId = 62;
    return $http({
      method: 'POST',
      url: '/tickets',
      data: ticket
    })
    .then(() =>{
      socket.emit('addTicket');
    });
  };

  //Sends PUT request to the server in order to mark the ticket as claimed
  var claimTicket = function (ticket) {
    return $http({
      method: 'PUT',
      url: '/claimed',
      data: ticket
    })
    .then(() =>{
      socket.emit('claimTicket');
    });
  };

  //Sends POST request to the server in order to erase the ticket from claims table
  var eraseClaim = function (data) {
    return $http({
      method: 'POST',
      url: '/eraseClaim',
      data: data
    })
    .then(() =>{
      socket.emit('eraseTicket');
    });
  };

  //Sends PUT request to the server in order to mark the ticket as solved
  var solveTicket = function (ticket) {
    return $http({
      method: 'PUT',
      url: '/solved',
      data: ticket
    })
    .then(() =>{
      socket.emit('solveTicket');
    });;
  };

  //Sends PUT request to the server in order to mark the ticket as NOT solved
  var unsolveTicket = function (ticket) {
    return $http({
      method: 'PUT',
      url: '/unsolved',
      data: ticket
    })
    .then(() =>{
      socket.emit('unsolveTicket');
    });
  };

  return {
    getTickets: getTickets,
    getTicket: getTicket,
    getUserTickets : getUserTickets,
    addTicket: addTicket,
    claimTicket: claimTicket,
    eraseClaim: eraseClaim,
    solveTicket: solveTicket,
    unsolveTicket: unsolveTicket
  }
}])

//Tickets factory - handles authentication processes
.factory('Auth', ['$http', '$window', function($http, $window){

  //Redirects to path, so GitHub OAuth process will be triggered
  var signin = function () {
    $window.location = '/auth/github';
  };

  //Redirects to path, so signout process will be triggered and handled on the server side
  var signout = function () {
    $window.location = '/signout';
  };

  return {
    signin: signin,
    signout: signout
  }
}])
.factory('loading', function() {
  return {loading: 'loading...'};
})
.factory('checkStatus', function(){
  var check = (cookie) => {
    if(cookie.user.fellow){
      return "fellow";
    } else {
      return "student";
    }
  }

  return {check : check}
})
.factory('guestLogin', ['guestInfo', function(guestInfo) {
  const setGuestInfo = () =>{
    guestInfo.user = {
      displayName:"Guest",
      fellow:true,
      student:true,
      id:"guest",
      mainId:62,
      username:"guest",
      guestLogin: true
    };
  };

  return{
    setGuestInfo : setGuestInfo
  };
}])
.factory('guestSignOut', ['guestInfo', function(guestInfo) {
  const restGuestInfo = () =>{
    guestInfo.user = { 
      guestLogin: false
    };
  };

  return {
    restGuestInfo: restGuestInfo
  };
}])
.factory('guestInfo', [ function() {
  return { 
    user:{
      guestLogin: false
    }
  };
}]);
;angular.module('app.student', [])

.factory('params', () =>{
  return {};
})
.controller('StudentController', ['$scope', 'Tickets', 'Auth', 'params', '$location', 'loading', 'guestInfo', 'guestSignOut', function($scope, Tickets, Auth, params, $location, loading, guestInfo, guestSignOut){

  let cookie;

  if(guestInfo.user.guestLogin){
    cookie = guestInfo;
  }else {
    cookie = JSON.parse(document.cookie.substr(document.cookie.indexOf('; ') + 1));
    if(cookie.user.fellow) $location.path('fellow');
  }

  $scope.data = {};
  $scope.loading = loading.loading;

  socket.on('ticketChange', () =>{
    console.log('ticketchanged')
    initializeQueue();
  });

  socket.on('messageAdded', (data) => {
    if (document.getElementById(data.toString())) {
      document.getElementById(data.toString()).style.display = 'block';
    }
  });

  var initializeQueue = function(cb) {
    //retrieve tickets from database
    //grab the cookie data from the session on passport

    Tickets.getUserTickets(cookie.user)
      .then(function(results){
        //add tickets to the scope
        $scope.data.tickets = results.data.tickets;
        console.log($scope.data.tickets);

        if($scope.data.tickets === undefined) return;
        //iterate through all tickets
        for (var ticket of $scope.data.tickets) {
          ticket.createdAt = moment(ticket.createdAt).startOf('minute').fromNow();
          //if the userId of the ticket matches the current session user
          if (ticket.userId === results.data.userID) {
            //add and set isMine attribute to true
            ticket.ismine = true;
          } else {
            ticket.ismine = false;
          }
        }

        //set claims to the scope
        $scope.data.claims = results.data.claims;

        //iterate through all claims
        for (var claim of $scope.data.claims) {
          //if the helpee (user) id of the claim matches the current session user
          if (claim.helpeeId === results.data.userID) {
            sweetAlert('Ticket claimed!', claim.user.displayname + ' is on the way!', 'success');
            //alert the helpee and include the name of the user who claimed the ticket
            for (var ticket of $scope.data.tickets) {
              //if the ticket's claimed attribute is true and the user of the claimed ticket matches the current session user
                //set the ticket's preSolved state to true
              if (ticket.claimed && ticket.userId === results.data.userID) {
                ticket.preSolved = true;
              }
            }
            //Delete the claim from the database
            Tickets.eraseClaim(claim)
            .then(function () {
              //wipe out client-side claims object
               $scope.data.claims = {};
            })
          }
        }
        if(cb) cb();
      })
      .catch(function(error){
        console.error(error);
      });
  };

  initializeQueue(() =>{
    console.log('initalize');
    $scope.loading = '';
  });

  $scope.ticket = {};

  $scope.addTicket = function () {
    // console.log('hELLOOOO')
    Tickets.addTicket($scope.ticket)
      .then(function () {
        $scope.ticket = {};
        initializeQueue();
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  $scope.signout = function ($location) {
    if(guestInfo.user.guestLogin){
      guestSignOut.restGuestInfo();
      $location.path('/signin');
    }else{
      Auth.signout();
      $location.path('/signin');
    }
  };

  $scope.claimTicket = function (ticket) {

    //once 'claim' has been clicked'
      //pass the claimed ticket to claim Ticket service
    Tickets.claimTicket(ticket)
      .then(function () {
        initializeQueue();
      })
      .catch(function (err) {
        console.log(err);
      });

  };

  $scope.solveTicket = function (ticket) {

    //if 'Solved' has been clicked on the ticket, pass that ticket into solveTicket service
     Tickets.solveTicket(ticket)
       .then(function () {
         initializeQueue();
       })
       .catch(function (err) {
         console.log(err);
       });
  };


  $scope.unsolveTicket = function (ticket) {

    //if 'Not Solved' is clicked, pass the ticket to unsolveTicket service
     Tickets.unsolveTicket(ticket)
      .then(function () {
        initializeQueue();
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  $scope.getTicket = function(ticket) {
    if(ticket.claimed){
      params.ticket = ticket;
      $location.path('chatroom');
    }
  };
}]);
;angular.module('app.chatroom', ['app.student'])
.controller('ChatroomController', ['$scope', '$timeout', 'Tickets', 'Auth', 'params', '$http', 'loading', 'checkStatus', '$location', 'guestInfo', 'guestSignOut', function($scope, $timeout, Tickets, Auth, params, $http, loading, checkStatus, $location, guestInfo, guestSignOut){
  let cookie;

  if(guestInfo.user.guestLogin){
    cookie = guestInfo;
  }else {
    cookie = JSON.parse(document.cookie.substr(document.cookie.indexOf('; ') + 1));
  }

  if(params.ticket === undefined){
    console.log(checkStatus);
    $location.path(checkStatus.check(cookie));
  }

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
    getChatroom($scope.ticketID);
  });

  socket.on('otherTyping', (data) => {
    if (data !== cookie.user.mainId) {
      $('#gif').css('visibility', 'visible');
      _.debounce(setTimeout(()=> {
        $('#gif').css('visibility', 'hidden')
      }, 1000), 3000);
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
      $scope.loading = '';
      $scope.sniptMsg = {
        msg:'Click the code area to edit, when finished click submit.',
        cl: 'alert alert-info'
      }

      resp.data.forEach(function(item) {
        item.createdAtUpdate = moment(item.createdAt).startOf('minute').fromNow();
        item.updatedAtUpdate = moment(item.updatedAt).startOf('hour').fromNow();
        // var url = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        // var url =  [-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*);
        var url = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
        var regex = new RegExp(url);
        var m = item.message;

        console.log("regext message: ", m.match(regex));

        if (m.match(regex)) {
          console.log("Successful match:", item);
          if((m.match(regex)[0].slice(0,4) !== "http") && (m.match(regex)[0].slice(0,4) !== "www.") && ((m.match(regex)[0].slice(0,4) !== ".com") || (m.match(regex)[0].slice(-4) !== ".co"))){
            item.url= "http://www." + m.match(regex)[0];
          } else if ((m.match(regex)[0].slice(0,4) === "www.") && ((m.match(regex)[0].slice(0,4) !== ".com") || (m.match(regex)[0].slice(-4) !== ".co"))){
            item.url= "http://" + m.match(regex)[0];
          } else {
            item.url=  m.match(regex)[0];
          }
        } else {
          console.log("No match");
        }
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

  // // emoji selector
  // $('#messageinput').emojiPicker({
  //   width: '300px',
  //   height: '200px',
  //   button: false
  // });

  // $('#trigger').click(function(e) {
  //   e.preventDefault();
  //   $('#messageinput').emojiPicker('toggle');
  // });

  $scope.typing = function() {
    socket.emit('typing', cookie.user.mainId);
  }

  $scope.codeChange = function() {
    socket.emit('codeChange', $scope.code);
  }

  $scope.backToTickets = function() {
    $location.path(checkStatus.check(cookie));
  }

  var initText = "// Drag javascript file into code area or start typing! \n";
  var defaultMode = "javascript";

  if(window.localStorage[`myEditor${params.ticket.id}`] !== undefined) {
    initText = window.localStorage[`myEditor${params.ticket.id}`];
  }

  var foldFunc = () => {
    CodeMirror.newFoldFunction(CodeMirror.braceRangeFinder);
  };

  var editor = new CodeMirror (document.getElementById("codeArea"),
    {
      value: initText,
      theme: 'monokai',
      autoCloseBrackets: true,
      autoCloseTags: true,
      lineNumbers: true,
      tabSize: 2,
      mode: 'javascript',
      smartIndent: true,
      autofocus: true,
      foldGutter: true,
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    });

  // todo: Figure out why gutter click does not fold text.
  editor.on('gutterClick', foldFunc);

  console.log('editor options: ', editor);

  if (initText === "// Drag javascript file into code area or start typing! \n") {
    editor.setCursor({line: 2, ch:0});
  }


  window.localStorage[`myEditor${params.ticket.id}`] = editor.getValue();

  editor.on('change', function() {
      window.localStorage[`myEditor${params.ticket.id}`] = editor.getValue();
  });

  $scope.submitCode = function() {
    socket.emit('codeChange', window.localStorage[`myEditor${params.ticket.id}`], cookie.user.mainId);
    $scope.sniptMsg.msg = 'Code sending...';
  }

  socket.on('codeReceived', (code, id) => {
    if (id !== cookie.user.mainId) {
      window.localStorage[`myEditor${params.ticket.id}`] = code;
      editor.setValue(code);
      $scope.sniptMsg.msg = 'Code recieved!'
      $scope.sniptMsg.cl = 'alert alert-success';
      socket.emit('codeRecieved')
      $timeout(() =>{
        $scope.sniptMsg.msg = 'Click the code area to edit, when finished click submit.'
        $scope.sniptMsg.cl = 'alert alert-info';
      }, 3000)
      // Sets cursor to end of doc after edit...develop live edit later.
      // $scope.editor.setCursor($scope.editor.lineCount(), 0);
    }else{
      $scope.sniptMsg.msg = 'Code sent!';
      $scope.sniptMsg.cl = 'alert alert-success';
      $scope.$digest();
      $timeout(() =>{
        $scope.sniptMsg.msg = 'Click the code area to edit, when finished click submit.'
        $scope.sniptMsg.cl = 'alert alert-info';
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

  $scope.signout = function ($location) {
    if(guestInfo.user.guestLogin){
      guestSignOut.restGuestInfo();
    }else{
      Auth.signout();
    }

    $location.path('/signin');
  }

}])
;angular.module('app.queue', [])

.controller('FellowController', ['$scope', 'Tickets', 'Auth', 'params', '$location', 'loading', 'guestInfo', 'guestSignOut', function($scope, Tickets, Auth, params, $location, loading, guestInfo, guestSignOut){

  let cookie;

  if(guestInfo.user.guestLogin){
    cookie = guestInfo;
  }else {
    cookie = JSON.parse(document.cookie.substr(document.cookie.indexOf('; ') + 1));
    if(!cookie.user.fellow) $location.path('student');
  }

  console.log(cookie, ' fellow log')

  $scope.data = {};
  var SVGpulse;
  var SVGdot;
  $scope.loading = loading.loading;

  socket.on('ticketChange', () =>{
    initializeQueue();
  });

  socket.on('messageAdded', (data) => {
    console.log(data);
    console.log(document.getElementById(data.toString()));
    if (document.getElementById(data.toString())) {
      document.getElementById(data.toString()).style.display = 'block';
      console.log(data);
    }
  });

  var initializeQueue = function(cb) {
    //retrieve tickets from database
    Tickets.getTickets()
      .then(function(results){

        SVGpulse = document.getElementsByClassName('pulse');
        SVGdot = document.getElementsByClassName('dot');

        //add tickets to the scope
        $scope.data.tickets = results.data.tickets;
        var tickets = $scope.data.tickets;

        //set claims to the scope
        $scope.data.claims = results.data.claims;

        //iterate through all tickets
        for (var ticket of $scope.data.tickets) {
          //if the userId of the ticket matches the current session user
          ticket.createdAt = moment(ticket.createdAt).startOf('minute').fromNow();
          if (ticket.userId === results.data.userID) {
            //add and set isMine attribute to true
            ticket.ismine = true;
          } else {
            ticket.ismine = false;
          }
        }


        //iterate through all claims
        for (var claim of $scope.data.claims) {
          //if the helpee (user) id of the claim matches the current session user
          if (claim.helpeeId === results.data.userID) {
            //alert the helpee and include the name of the user who claimed the ticket

            for (var ticket of $scope.data.tickets) {
              //if the ticket's claimed attribute is true and the user of the claimed ticket matches the current session user
                //set the ticket's preSolved state to true
              if (ticket.claimed && ticket.userId === results.data.userID) {
                ticket.preSolved = true;
              }
            }
            //Delete the claim from the database
            Tickets.eraseClaim(claim)
            .then(function () {
              //wipe out client-side claims object
               $scope.data.claims = {};
            })
          }
        }
        if(cb) cb();
      })
      .catch(function(error){
        console.error(error);
      });
  }

  $scope.ticket = {};

  // MAPPPPPPPP
  // $scope.addTicket = function () {

  // //assign random color for each ticket's dot
  // function getRandomColor() {
  //   var letters = '0123456789ABCDEF'.split(''),
  //       color = '#';
  //   for(var i = 0; i < 6; i++ ) {
  //       color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // };

  // $scope.ticket.color =  getRandomColor();

  // if ($scope.ticket.location === 'Lecture Hall') {
  //   $scope.ticket.x = Math.random() * 165 + 25;
  //   $scope.ticket.y = Math.random() * 50 + 50;

  // } else if ($scope.ticket.location === 'Pairing Station') {
  //   $scope.ticket.x = Math.random() * 165 + 25;
  //   $scope.ticket.y = Math.random() * 70 + 140;

  // } else if ($scope.ticket.location === 'Kitchen') {
  //   $scope.ticket.x = Math.random() * 165 + 25;
  //   $scope.ticket.y = Math.random() * 80 + 240;

  // } else if ($scope.ticket.location === 'Couch') {
  //   $scope.ticket.x = Math.random() * 120 + 250;
  //   $scope.ticket.y = Math.random() * 95 + 230;

  // } else if ($scope.ticket.location === 'Senior Zone') {
  //   $scope.ticket.x = Math.random() * 100 + 270;
  //   $scope.ticket.y = Math.random() * 240 + 370;

  // } else if ($scope.ticket.location === 'The Hopper') {
  //   $scope.ticket.x = Math.random() * 135 + 25;
  //   $scope.ticket.y = Math.random() * 80 + 470;

  // } else if ($scope.ticket.location === 'The Dijkstra') {
  //   $scope.ticket.x = Math.random() * 135 + 25;
  //   $scope.ticket.y = Math.random() * 65 + 590;

  // } else if ($scope.ticket.location === 'The Ada') {
  //   $scope.ticket.x = Math.random() * 80 + 290;
  //   $scope.ticket.y = Math.random() * 105 + 655;

  // } else if ($scope.ticket.location === 'Entrance Hall') {
  //   $scope.ticket.x = Math.random() * 235 + 25;
  //   $scope.ticket.y = Math.random() * 70 + 690;
  // }

  // //retrieve new ticket from html form, pass to add Ticket function
  // Tickets.addTicket($scope.ticket)
  //   .then(function () {
  //     $scope.ticket = {};
  //     initializeQueue();
  //   })
  //   .catch(function (err) {
  //     console.log(err);
  //   });
  // }

  $scope.signout = function ($location) {
    if(guestInfo.user.guestLogin){
      guestSignOut.restGuestInfo();
    }else{
      Auth.signout();
    }

    $location.path('/signin');
  };

  $scope.claimTicket = function (ticket) {

    //once 'claim' has been clicked'
      //pass the claimed ticket to claim Ticket service
    Tickets.claimTicket(ticket)
      .then(function () {
        initializeQueue();
      })
      .catch(function (err) {
        console.log(err);
      });

  }

  $scope.solveTicket = function (ticket) {

    //if 'Solved' has been clicked on the ticket, pass that ticket into solveTicket service
     Tickets.solveTicket(ticket)
       .then(function () {
         initializeQueue();
       })
       .catch(function (err) {
         console.log(err);
       });
  }


  $scope.unsolveTicket = function (ticket) {

    //if 'Not Solved' is clicked, pass the ticket to unsolveTicket service
     Tickets.unsolveTicket(ticket)
      .then(function () {
        initializeQueue();
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  initializeQueue(() =>{
    $scope.loading = '';
  });


  //functionality: on hover of ticket, hide all dots that do not match ticket's x and y coordinates
  // $scope.showDot = function (ticketX, ticketY) {

  //   //iterate through all dots
  //   for (var i = 0; i < SVGdot.length; i++) {
  //     //find each dot's x and y coordinates
  //     var x = SVGdot[i].parentElement.parentElement.getAttribute('x');
  //     var y = SVGdot[i].parentElement.parentElement.getAttribute('y');

  //     //given the x and y coordinates of the ticket (ticketX, ticketY, if the dot and the ticket coordinates do NOT match, add class 'hidden' to dot.
  //     if (x !== ticketX.toString() && y !== ticketY.toString()) {
  //       SVGpulse[i].setAttribute('class', 'pulse hiddenPulse');
  //       SVGdot[i].setAttribute('class', 'dot hiddenDot');
  //     }
  //   }
  // }

  $scope.getTicket = function(ticket) {
    console.log(ticket);
    params.ticket = ticket;
    $location.path('chatroom');
  };

  $scope.sendToForm = function() {
    $location.path('addfellow');
  };

}]);
;angular.module('app.services', [])

//Tickets factory - handles all tickets manipulations
.factory('Tickets', ['$http', '$window', function ($http, $window) {

  //Sends GET request to the server in order to render tickets
  var getTickets = function () {
    return $http({
      method: 'GET',
      url: '/tickets'
    })
    .then(function (resp) {
      if (resp.data === 'failed') {
        //Redirects to signing if authentication fails
        $window.location = '/#/signin';
      }

      return resp;
    });
  };

  var getUserTickets = function (user) {
    console.log(user, ' user object')
    return $http({
      method: 'GET',
      url: `/tickets/${user.mainId}`
    })
    .then(function (resp) {
      if (resp.data === 'failed') {
        //Redirects to signing if authentication fails
        $window.location = '/#/signin';
      }

      return resp;
    });
  };

  //Get one ticket from the database
  var getTicket = function (ticketId) {
    console.log(ticketId);
    return $http({
      method: 'POST',
      url: `/ticket/${ticketId}`,
    })
    .then((resp) =>{
      return resp;
    });
  };

  //Sends POST request to the server in order to post a new ticket
  var addTicket = function (ticket) {
    console.log(ticket)
    ticket.guestId = 62;
    return $http({
      method: 'POST',
      url: '/tickets',
      data: ticket
    })
    .then(() =>{
      socket.emit('addTicket');
    });
  };

  //Sends PUT request to the server in order to mark the ticket as claimed
  var claimTicket = function (ticket) {
    return $http({
      method: 'PUT',
      url: '/claimed',
      data: ticket
    })
    .then(() =>{
      socket.emit('claimTicket');
    });
  };

  //Sends POST request to the server in order to erase the ticket from claims table
  var eraseClaim = function (data) {
    return $http({
      method: 'POST',
      url: '/eraseClaim',
      data: data
    })
    .then(() =>{
      socket.emit('eraseTicket');
    });
  };

  //Sends PUT request to the server in order to mark the ticket as solved
  var solveTicket = function (ticket) {
    return $http({
      method: 'PUT',
      url: '/solved',
      data: ticket
    })
    .then(() =>{
      socket.emit('solveTicket');
    });;
  };

  //Sends PUT request to the server in order to mark the ticket as NOT solved
  var unsolveTicket = function (ticket) {
    return $http({
      method: 'PUT',
      url: '/unsolved',
      data: ticket
    })
    .then(() =>{
      socket.emit('unsolveTicket');
    });
  };

  return {
    getTickets: getTickets,
    getTicket: getTicket,
    getUserTickets : getUserTickets,
    addTicket: addTicket,
    claimTicket: claimTicket,
    eraseClaim: eraseClaim,
    solveTicket: solveTicket,
    unsolveTicket: unsolveTicket
  }
}])

//Tickets factory - handles authentication processes
.factory('Auth', ['$http', '$window', function($http, $window){

  //Redirects to path, so GitHub OAuth process will be triggered
  var signin = function () {
    $window.location = '/auth/github';
  };

  //Redirects to path, so signout process will be triggered and handled on the server side
  var signout = function () {
    $window.location = '/signout';
  };

  return {
    signin: signin,
    signout: signout
  }
}])
.factory('loading', function() {
  return {loading: 'loading...'};
})
.factory('checkStatus', function(){
  var check = (cookie) => {
    if(cookie.user.fellow){
      return "fellow";
    } else {
      return "student";
    }
  }

  return {check : check}
})
.factory('guestLogin', ['guestInfo', function(guestInfo) {
  const setGuestInfo = () =>{
    guestInfo.user = {
      displayName:"Guest",
      fellow:true,
      student:true,
      id:"guest",
      mainId:62,
      username:"guest",
      guestLogin: true
    };
  };

  return{
    setGuestInfo : setGuestInfo
  };
}])
.factory('guestSignOut', ['guestInfo', function(guestInfo) {
  const restGuestInfo = () =>{
    guestInfo.user = { 
      guestLogin: false
    };
  };

  return {
    restGuestInfo: restGuestInfo
  };
}])
.factory('guestInfo', [ function() {
  return { 
    user:{
      guestLogin: false
    }
  };
}]);
;angular.module('app.student', [])

.factory('params', () =>{
  return {};
})
.controller('StudentController', ['$scope', 'Tickets', 'Auth', 'params', '$location', 'loading', 'guestInfo', 'guestSignOut', function($scope, Tickets, Auth, params, $location, loading, guestInfo, guestSignOut){

  let cookie;

  if(guestInfo.user.guestLogin){
    cookie = guestInfo;
  }else {
    cookie = JSON.parse(document.cookie.substr(document.cookie.indexOf('; ') + 1));
    if(cookie.user.fellow) $location.path('fellow');
  }

  $scope.data = {};
  $scope.loading = loading.loading;

  socket.on('ticketChange', () =>{
    console.log('ticketchanged')
    initializeQueue();
  });

  socket.on('messageAdded', (data) => {
    if (document.getElementById(data.toString())) {
      document.getElementById(data.toString()).style.display = 'block';
    }
  });

  var initializeQueue = function(cb) {
    //retrieve tickets from database
    //grab the cookie data from the session on passport

    Tickets.getUserTickets(cookie.user)
      .then(function(results){
        //add tickets to the scope
        $scope.data.tickets = results.data.tickets;
        console.log($scope.data.tickets);

        if($scope.data.tickets === undefined) return;
        //iterate through all tickets
        for (var ticket of $scope.data.tickets) {
          ticket.createdAt = moment(ticket.createdAt).startOf('minute').fromNow();
          //if the userId of the ticket matches the current session user
          if (ticket.userId === results.data.userID) {
            //add and set isMine attribute to true
            ticket.ismine = true;
          } else {
            ticket.ismine = false;
          }
        }

        //set claims to the scope
        $scope.data.claims = results.data.claims;

        //iterate through all claims
        for (var claim of $scope.data.claims) {
          //if the helpee (user) id of the claim matches the current session user
          if (claim.helpeeId === results.data.userID) {
            sweetAlert('Ticket claimed!', claim.user.displayname + ' is on the way!', 'success');
            //alert the helpee and include the name of the user who claimed the ticket
            for (var ticket of $scope.data.tickets) {
              //if the ticket's claimed attribute is true and the user of the claimed ticket matches the current session user
                //set the ticket's preSolved state to true
              if (ticket.claimed && ticket.userId === results.data.userID) {
                ticket.preSolved = true;
              }
            }
            //Delete the claim from the database
            Tickets.eraseClaim(claim)
            .then(function () {
              //wipe out client-side claims object
               $scope.data.claims = {};
            })
          }
        }
        if(cb) cb();
      })
      .catch(function(error){
        console.error(error);
      });
  };

  initializeQueue(() =>{
    console.log('initalize');
    $scope.loading = '';
  });

  $scope.ticket = {};

  $scope.addTicket = function () {
    // console.log('hELLOOOO')
    Tickets.addTicket($scope.ticket)
      .then(function () {
        $scope.ticket = {};
        initializeQueue();
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  $scope.signout = function ($location) {
    if(guestInfo.user.guestLogin){
      guestSignOut.restGuestInfo();
      $location.path('/signin');
    }else{
      Auth.signout();
      $location.path('/signin');
    }
  };

  $scope.claimTicket = function (ticket) {

    //once 'claim' has been clicked'
      //pass the claimed ticket to claim Ticket service
    Tickets.claimTicket(ticket)
      .then(function () {
        initializeQueue();
      })
      .catch(function (err) {
        console.log(err);
      });

  };

  $scope.solveTicket = function (ticket) {

    //if 'Solved' has been clicked on the ticket, pass that ticket into solveTicket service
     Tickets.solveTicket(ticket)
       .then(function () {
         initializeQueue();
       })
       .catch(function (err) {
         console.log(err);
       });
  };


  $scope.unsolveTicket = function (ticket) {

    //if 'Not Solved' is clicked, pass the ticket to unsolveTicket service
     Tickets.unsolveTicket(ticket)
      .then(function () {
        initializeQueue();
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  $scope.getTicket = function(ticket) {
    if(ticket.claimed){
      params.ticket = ticket;
      $location.path('chatroom');
    }
  };
}]);
