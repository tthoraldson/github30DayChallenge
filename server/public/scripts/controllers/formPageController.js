myApp.controller("FormPageController", ["$scope", "$http", "$location", "AuthFactory", function($scope, $http, $location, AuthFactory) {
    console.log("Loaded: Form Page Controller");

    $scope.tab = 1;
    var user = {
      data: []
    }
    $scope.userData = [];

    $scope.updatePerson = function(){
      console.log('UPDATING NAME TO: ', this.$data);
      // this.$data send to put request, make sure it updates the correct person

    }

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
        $scope.userData = data;
        // console.log($scope.userData);
    });

}]);
