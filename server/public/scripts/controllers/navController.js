myApp.controller("NavController", ["$scope", "$http", "$location", "AuthFactory", function($scope, $http, $location, AuthFactory) {
  console.log("NavController works");

$scope.logOff = function(){
  signOut();
}

$scope.auth = AuthFactory;

$scope.auth.$onAuthStateChanged(function(user) {
  $scope.user = user;

  console.log(user); //change the path here
});


}]);
