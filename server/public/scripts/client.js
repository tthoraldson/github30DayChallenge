var myApp = angular.module("myApp", ["ngRoute", "firebase"]);
myApp.config(['$routeProvider', '$sceDelegateProvider', function($routeProvider, $sceDelegateProvider, $mdThemingProvider) {

    $routeProvider
        .when('/home', {
            templateUrl: '/views/partials/home.html',
            controller: 'HomeController'
        })
        .when('/admin', {
            templateUrl: '/views/partials/admin.html',
            controller: 'AdminController',
            resolve: {
              'currentAuth': ['AuthFactory', function(AuthFactory){
                return AuthFactory.$requireSignIn();
              }]
            }
        })
        .when('/registration', {
            templateUrl: '/views/partials/registration.html',
            controller: 'RegistrationController'
        })
        .when('/invite', {
            templateUrl: '/views/partials/invite.html',
            controller: 'InviteController'
        })
        .otherwise({
            redirectTo: 'home'
        });

}]);

myApp.run(['$rootScope', '$location', 'AuthFactory', redirectHome]);
 //  In combination with the route configuration, this redirects to
 //  the home view if user is not authenticated
 function redirectHome($rootScope, $location, AuthFactory) {
     $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
         if (error === 'AUTH_REQUIRED') {
             $location.path('/login');
         }
     });
}
