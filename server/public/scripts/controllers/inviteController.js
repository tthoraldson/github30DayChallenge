myApp.controller("InviteController", ["$scope", "$http", "$location", "AuthFactory", "UserFactory", "EmailFactory", function($scope, $http, $location, AuthFactory, UserFactory, EmailFactory) {
    console.log("InviteController works");
    $scope.results = false;
    $scope.question1 = false;
    $scope.question2 = false;

    
    $scope.auth = AuthFactory;
    $scope.emailInfo= {};

    $scope.auth.$onAuthStateChanged(function(user) {
      $scope.user = user;

      console.log('This is the invite user:', user); //change the path here
    });


    $scope.allEmails = function(){
      var emailFunction = EmailFactory.allEmails()
      $scope.emailInfo.emails = emailFunction($scope.userData, $scope.emailInfo);
    };


    var getData = UserFactory.getData();

    getData('users').then(function(data) {
        // console.log(data);
        $scope.userData = data;
    });

    $scope.email = EmailFactory.sendEmail();

}]);
