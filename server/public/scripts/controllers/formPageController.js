myApp.controller("FormPageController", ["$scope", "$http", "$location", 'AuthFactory', function($scope, $http, $location, AuthFactory) {
  console.log("Loaded: Form Page Controller");

    $scope.tab = 1;
}]);
