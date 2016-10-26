angular.module('app.chatroom', ['student'])
.controller('ChatroomController', ['$scope', '$cookies', 'Tickets', 'Auth', 'params' function($scope, $cookies, Tickets, Auth, params){
	var ticket = params.ticket;
}