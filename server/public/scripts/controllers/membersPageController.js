myApp.controller("MembersPageController", ["$scope", "$http", "$location", 'AuthFactory', function($scope, $http, $location, AuthFactory) {
  console.log("Loaded: Members Page Controller");

  $scope.tab = 1;

}]);
