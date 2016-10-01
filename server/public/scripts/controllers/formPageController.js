myApp.controller("FormPageController", ["$scope", "$http", "$location", "AuthFactory",  function($scope, $http, $location, AuthFactory) {
    console.log("Loaded: Form Page Controller");

    $scope.tab = 1;
    var user = {
      data: []
    }
    $scope.userData = [];

    $scope.genName = function(input){
      console.log(input);
        for (i = 0; i < input; i++){
          console.log("hey");





          var textArray = [
              'song1.ogg',
              'song2.ogg'
          ];
          var randomNumber = Math.floor(Math.random()*textArray.length);

          // append names to dom




        }
    }

    $scope.updatePerson = function(user){
      console.log('UPDATING NAME TO: ', this.$data);
      console.log(user);

      // perhaps will will create a custom confirm box at some point
      // so it will read "yes" and "no" and be cute or something
// bring in Bootstrap UI with $dialog dependency
// http://stackoverflow.com/questions/17151940/angularjs-custom-confirm-box

      // $scope.updatePerson = function(user){
      //     var msgbox = $dialog.messageBox('Are you sure?', [{label:'Yes, I\'m sure', result: 'yes'},{label:'Nope', result: 'no'}]);
      //     msgbox.open().then(function(result){
      //         if(result === 'yes') {
      //           $http.put('/userData', {oldData: user, newData: this.$data})
      //           console.log("update person " + this.$data);
      //         }
      //     });
      // };

      if (confirm("Are you Sure you want to Change this Info?\n\n\nPlease refresh page if you hit cancel\n\n")) {
      $http.put('/userData', {oldData: user, newData: this.$data})
      // this.$data send to put request, make sure it updates the correct person

  } else {
    //do nothing
  }

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
