myApp.controller("SurveyController", ["$scope", "$http", "$location", "AuthFactory", "UserFactory", function($scope, $http, $location, AuthFactory, UserFactory) {
    console.log("SurveyController works");


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

    getData('admin').then(function(response){
      console.log(response);
      getData('form_history').then(function(data){
        data.forEach(function(survey){
          if (survey.id == response[0].currentsurvey){
            console.log(survey);
            $scope.currentSurvey = survey;
          }
        })

      })
    });

}]);
