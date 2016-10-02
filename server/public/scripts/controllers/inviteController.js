myApp.controller("InviteController", ["$scope", "$http", "$location", "AuthFactory", "UserFactory", function($scope, $http, $location, AuthFactory, UserFactory) {
    console.log("InviteController works");

    $scope.auth = AuthFactory;
    $scope.emailInfo= {};

    $scope.auth.$onAuthStateChanged(function(user) {
      $scope.user = user;

      console.log('This is the invite user:', user); //change the path here
    });

    // $scope.emailInfo.displayName = $scope.user.displayName;

    $scope.allEmails = function(){
        var emailArray = []
        $scope.userData.forEach(function(user){
          console.log('this is the user:', user.email);
          emailArray.push(user.email);
        });
        var tempString = '';
        emailArray.forEach(function(email, index){
          if(index != emailArray.length - 1){
            tempString += email + ', ';
          } else {
            tempString += email;
          }
        })
        console.log(tempString);
        $scope.emailInfo.sendAddress = tempString;
         return tempString;
    }



    getData('users').then(function(data) {
        // console.log(data);
        $scope.userData = data;
        // $scope.userData.push(data);

        // console.log("$scope.userData in getUsers(): ", $scope.userData);
    });

    function getData(database) {
        var promise = $http.get('/userData', { //SELECT * FROM database
            params: {
                db: database
            }
        }).then(function(data) {
            // console.log('GET COMPLETE: Updated $scope.' + database);
            return data.data;
        });

        return promise;
    }


    $scope.email = function(emailInfo) {

      // console.log(emailInfo.body);
      emailInfo.displayName = $scope.user.displayName;
        $http.post('/email', emailInfo).then(function(response) {
            console.log("email success response: ", response);
        });
    };

}]);
