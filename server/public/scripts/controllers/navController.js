myApp.controller("NavController", ["$scope", "$http", "$location", "AuthFactory", "UserFactory", function($scope, $http, $location, AuthFactory, UserFactory) {
    console.log("NavController works");


    $http.get('/userData', {params: {db: 'users'}})
        .then(function(userData) {
            var tempUser;

            $scope.auth.$onAuthStateChanged(function(theUser){
              tempUser = theUser;
              // console.log(user);

              if(tempUser != null){
                userData.data.forEach(function(member) {


                if (member.user_id == tempUser.providerData[0].uid) {
                  console.log(member);
                    $scope.currentUser = member.auth_level;
                    console.log('this is the current user auth level:', $scope.currentUser);
                }
            });

          } else {
            console.log('what');
          }

        })
      });

    $scope.auth = AuthFactory;
    $scope.auth.$onAuthStateChanged(function(user) {
        $scope.user = user;
        // $scope.currentUser = $scope.user;
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
