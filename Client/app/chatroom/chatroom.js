angular.module('app.chatroom', ['app.student'])
.controller('ChatroomController', ['$scope', '$cookies', 'Tickets', 'Auth', 'params', function($scope, $cookies, Tickets, Auth, params){
	$scope.ticket = params.ticket;
}]);