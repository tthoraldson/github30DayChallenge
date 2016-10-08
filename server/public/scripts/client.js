var myApp = angular.module("myApp", ["ngRoute", "firebase", "xeditable"]);

myApp.config(['$routeProvider', '$sceDelegateProvider', function($routeProvider, $sceDelegateProvider) {

    $routeProvider
        .when('/invite', {
            templateUrl: '/views/partials/invite.html',
            controller: 'InviteController',
            resolve: {
              'currentAuth': ['AuthFactory', '$http', '$location', function(AuthFactory, $http, $location){

                var auth = AuthFactory;
                auth.$onAuthStateChanged(function(user) {
                    var theUser = user;

                    // console.log('This is the current user12341234:', theUser); //change the path here

                    //     $http.get('/userData', {params:{db:'users'}}).then(function(data){
                    //       // console.log('this is the data:', data);
                    //       data.data.forEach(function(member){
                    //       if(theUser == null || user.email == member.email){
                    //         // console.log('this is the member:', member);
                    //         if(member.auth_level == 33){
                    //             $location.path('/invite');//allow them access to this route
                    //         }else{
                    //             $location.path('/survey');    //redirect user to home.
                    //         }
                    //       }
                    //
                    //     });
                    // });
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

                    //     $http.get('/userData', {params:{db:'users'}}).then(function(data){
                    //       // console.log('this is the data:', data);
                    //       data.data.forEach(function(member){
                    //       if(theUser == null || user.email == member.email){
                    //         // console.log('this is the member:', member);
                    //         if(member.auth_level == 33){
                    //             $location.path('/data');  //allow them access to this route
                    //         }else{
                    //             $location.path('/survey');    //redirect user to home.
                    //         }
                    //       }
                    //     });
                    // });
                });
                return AuthFactory.$requireSignIn();
              }]
            },
            activetab: 'data'
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

                        // $http.get('/userData', {params:{db:'users'}}).then(function(data){
                        //   console.log('this is the data:', data);
                        //   data.data.forEach(function(member){
                        //   if(theUser == null || user.email == member.email){
                        //     console.log('this is the member:', member);
                        //     if(member.auth_level == 33){
                        //         $location.path('/forms');//allow them access to this route
                        //     }else{
                        //         $location.path('/survey');    //redirect user to home.
                        //     }
                        //   }

                    //     });
                    // });
                });
                return AuthFactory.$requireSignIn();
              }]
            },
            activetab: 'forms'
        })
        .when('/survey', {
            templateUrl: '/views/partials/survey.html',
            controller: 'SurveyController'
        })

        .otherwise({
            redirectTo: 'survey'
        });

}]);

myApp.run(['$rootScope', '$location', 'AuthFactory', redirectHome]);

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
