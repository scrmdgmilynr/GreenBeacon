//initialize app module, include services and auth dependencies

angular.module('app', ['app.auth', 'app.queue', 'app.services', 'app.student', 'app.chatroom', 'ngRoute', 'ngSanitize'])

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
		.otherwise({
			redirectTo: '/signin'
		});

});
