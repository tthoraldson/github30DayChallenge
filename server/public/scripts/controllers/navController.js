myApp.controller("NavController", ["$scope", "$http", "$location", "AuthFactory", "UserFactory", function($scope, $http, $location, AuthFactory, UserFactory) {
    console.log("NavController works");

    $scope.auth = AuthFactory;

    $scope.auth.$onAuthStateChanged(function(user) {
        $scope.user = user;

        

        console.log('This is the current user:', user); //change the path here
    });

    var userFactory = UserFactory;
    var signIn = userFactory.signIn();
    var signOut = userFactory.signOut();

    $scope.logIn = function() {
        signIn();
    }

    $scope.logOff = function() {
        signOut();
    }


}]);
