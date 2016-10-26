//Queue controller

angular.module('app.student', [])

.controller('StudentController', ['$scope', 'Tickets', 'Auth', function($scope, Tickets, Auth){

  $scope.data = {};

  socket.on('ticketChange', () =>{
    initializeQueue();
  });

  var initializeQueue = function() {
    //retrieve tickets from database

    //grab the cookie data from the session on passport
    const cookie = JSON.parse(document.cookie.substr(document.cookie.indexOf('; ') + 1));

    Tickets.getTicket(cookie.user)
      .then(function(results){

        //add tickets to the scope
        $scope.data.tickets = results.data.tickets;
        //iterate through all tickets
        for (var ticket of $scope.data.tickets) {
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
            //alert the helpee and include the name of the user who claimed the ticket
            alert(claim.user.displayname + ' is on their way!');

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
      })
      .catch(function(error){
        console.error(error);
      })
  }

  initializeQueue();

  $scope.ticket = {};

  $scope.addTicket = function () {
    Tickets.addTicket($scope.ticket)
      .then(function () {
        $scope.ticket = {};
        initializeQueue();
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  $scope.signout = function () {
    Auth.signout();
  }

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

  $scope.getTicket = function(ticket) {

    Tickets.getTicket(ticket)
      .then(function () {
          initializeQueue();
        })
      .catch(function (err) {
        console.log(err);
      });
  }
}])
