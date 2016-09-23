myApp.controller("InviteController", ["$scope", "$http", "$location", "AuthFactory", "UserFactory", function($scope, $http, $location, AuthFactory, UserFactory) {
  console.log("InviteController works");

  // $scope.emailInfo = {};


  $scope.email = function(emailInfo){
    $http.post('/email', emailInfo).then(function(response) {
    console.log("email success response: ", response);
  });
};

}]);
