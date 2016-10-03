var myApp = angular.module("myApp", ["ngRoute", "firebase", "xeditable"]);

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
              'currentAuth': ['AuthFactory', '$http', '$location', function(AuthFactory, $http, $location){

                var auth = AuthFactory;
                auth.$onAuthStateChanged(function(user) {
                    var theUser = user;

                    // console.log('This is the current user12341234:', theUser); //change the path here

                        $http.get('/userData', {params:{db:'users'}}).then(function(data){
                          // console.log('this is the data:', data);
                          data.data.forEach(function(member){
                          if(theUser == null || user.email == member.email){
                            // console.log('this is the member:', member);
                            if(member.auth_level == 33){
                                $location.path('/admin');//allow them access to this route
                            }else{
                                $location.path('/survey');    //redirect user to home.
                            }
                          }

                        });
                    });
                });
                return AuthFactory.$requireSignIn();
              }]
            }
        })
        .when('/registration', {
            templateUrl: '/views/partials/registration.html',
            controller: 'RegistrationController',
            resolve: {
              'currentAuth': ['AuthFactory', '$http', '$location', function(AuthFactory, $http, $location){

                var auth = AuthFactory;
                auth.$onAuthStateChanged(function(user) {
                    var theUser = user;

                        $http.get('/userData', {params:{db:'users'}}).then(function(data){
                          // console.log('this is the data:', data);
                          data.data.forEach(function(member){
                          if(theUser == null || user.email == member.email){
                            // console.log('this is the member:', member);
                            if(member.auth_level == 33){
                                $location.path('/registration');//allow them access to this route
                            }else{
                                $location.path('/survey');    //redirect user to home.
                            }
                          }

                        });
                    });
                });
                return AuthFactory.$requireSignIn();
              }]
            }
        })
        .when('/invite', {
            templateUrl: '/views/partials/invite.html',
            controller: 'InviteController',
            resolve: {
              'currentAuth': ['AuthFactory', '$http', '$location', function(AuthFactory, $http, $location){

                var auth = AuthFactory;
                auth.$onAuthStateChanged(function(user) {
                    var theUser = user;

                    // console.log('This is the current user12341234:', theUser); //change the path here

                        $http.get('/userData', {params:{db:'users'}}).then(function(data){
                          // console.log('this is the data:', data);
                          data.data.forEach(function(member){
                          if(theUser == null || user.email == member.email){
                            // console.log('this is the member:', member);
                            if(member.auth_level == 33){
                                $location.path('/invite');//allow them access to this route
                            }else{
                                $location.path('/survey');    //redirect user to home.
                            }
                          }

                        });
                    });
                });
                return AuthFactory.$requireSignIn();
              }]
            }
        })
        .when('/data', {
            templateUrl: '/views/partials/dataPage.html',
            controller: 'DataPageController',
            resolve: {
              'currentAuth': ['AuthFactory', '$http', '$location', function(AuthFactory, $http, $location){

                var auth = AuthFactory;
                auth.$onAuthStateChanged(function(user) {
                    var theUser = user;

                    // console.log('This is the current user12341234:', theUser); //change the path here

                        $http.get('/userData', {params:{db:'users'}}).then(function(data){
                          // console.log('this is the data:', data);
                          data.data.forEach(function(member){
                          if(theUser == null || user.email == member.email){
                            // console.log('this is the member:', member);
                            if(member.auth_level == 33){
                                $location.path('/data');//allow them access to this route
                            }else{
                                $location.path('/survey');    //redirect user to home.
                            }
                          }
                        });
                    });
                });
                return AuthFactory.$requireSignIn();
              }]
            }
        })
        .when('/forms', {
            templateUrl: '/views/partials/formPage.html',
            controller: 'FormPageController',
            resolve: {
              'currentAuth': ['AuthFactory', '$http', '$location', function(AuthFactory, $http, $location){

                var auth = AuthFactory;
                auth.$onAuthStateChanged(function(user) {
                    var theUser = user;

                    // console.log('This is the current user12341234:', theUser); //change the path here

                        $http.get('/userData', {params:{db:'users'}}).then(function(data){
                          // console.log('this is the data:', data);
                          data.data.forEach(function(member){
                          if(theUser == null || user.email == member.email){
                            // console.log('this is the member:', member);
                            if(member.auth_level == 33){
                                $location.path('/forms');//allow them access to this route
                            }else{
                                $location.path('/survey');    //redirect user to home.
                            }
                          }

                        });
                    });
                });
                return AuthFactory.$requireSignIn();
              }]
            }
        })
        .when('/survey', {
            templateUrl: '/views/partials/survey.html',
            controller: 'SurveyController'
            // resolve: {
            //   'currentAuth': ['AuthFactory', function(AuthFactory){
            //     return AuthFactory.$requireSignIn();
            //   }]
            // }
        })

        .otherwise({
            redirectTo: 'home'
        });

}]);

myApp.run(['$rootScope', '$location', 'AuthFactory', redirectHome]);

// xeditable
// myApp.run(function(editableOptions) {
//   editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
// });
myApp.run(function(editableOptions, editableThemes) {
  editableThemes.bs3.inputClass = 'input-sm';
  editableThemes.bs3.buttonsClass = 'btn-sm';
  editableOptions.theme = 'bs3';
});


 //  In combination with the route configuration, this redirects to
 //  the home view if user is not authenticated
 function redirectHome($rootScope, $location, AuthFactory) {
     $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
         if (error === 'AUTH_REQUIRED') {
             $location.path('/survey');
         }
     });
}
