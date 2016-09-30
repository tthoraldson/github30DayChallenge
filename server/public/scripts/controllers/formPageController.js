myApp.controller("FormPageController", ["$scope", "$http", "$location", 'AuthFactory', function($scope, $http, $location, AuthFactory) {
    console.log("Loaded: Form Page Controller");

    $scope.tab = 1;
    var user = {
      data: []
    }
    $scope.userData = [];

    //TODO: PUT INTO FACTORY!!!
    function getData(database) {
        var promise = $http.get('/userData', { //SELECT * FROM database
            params: {
                db: database
            }
        }).then(function(data) {
            console.log('GET COMPLETE: Updated $scope.' + database);
            return data.data;
        });

        return promise;
    }

    getData('users').then(function(data) {
        console.log(data);
        // for each user, push a new user to userData array
        // $scope.userData.push('user');
        // console.log($scope.users);
        // for(var i = 0; i <= $scope.userData.length; i++){

        $scope.userData = data;
      //    {
      //       data: data,
      //       id: data[i].id,
      //       github_url: data[i].github_url,
      //       email: data[i].email,
      //       display_name: data[i].display_name,
      //       authToken: data[i].authToken,
      //       user_id: data[i].user_id,
      //       profile_photo: data[i].profile_photo,
      //       auth_level: data[i].auth_level
      // });
      // }
      console.log($scope.userData);
    });

}]);
