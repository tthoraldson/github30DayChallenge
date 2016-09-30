myApp.controller("InviteController", ["$scope", "$http", "$location", "AuthFactory", "UserFactory", function($scope, $http, $location, AuthFactory, UserFactory) {
    console.log("InviteController works");

    $scope.auth = AuthFactory;

    $scope.auth.$onAuthStateChanged(function(user) {
      $scope.user = user;

      console.log('This is the invite user:', user); //change the path here
    });

    // $scope.emailInfo.displayName = $scope.user.displayName;

    $scope.email = function(emailInfo) {

      
      // console.log(emailInfo.body);
      emailInfo.displayName = $scope.user.displayName;
        $http.post('/email', emailInfo).then(function(response) {
            console.log("email success response: ", response);
        });
    };

}]);
