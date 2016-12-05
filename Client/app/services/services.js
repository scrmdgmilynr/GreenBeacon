angular.module('app.services', [])

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
  const setGuestInfo = (mainId, displayName, username, type) =>{
    let fellow = true;
    let student = true;
    
    if(type === 'fellow'){
      student = false;
    }
    if(type === 'student'){
      fellow = false;
    }

    guestInfo.user = {
      displayName:displayName,
      fellow:fellow,
      student:student,
      id:0,
      mainId:mainId,
      username:username,
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
    console.log('sign out complete');
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
