myApp.controller("LoginController", ["$scope", "$http", "$location", 'AuthFactory', 'UserFactory', function($scope, $http, $location, AuthFactory, UserFactory) {
  console.log("LoginController works");

  var userFactory = UserFactory;
  var signIn = userFactory.signIn();
  var signOut = userFactory.signOut();

  $scope.logIn = function(){
    signIn();
  }

  $scope.logOff = function(){
  signOut();
}

}]);
