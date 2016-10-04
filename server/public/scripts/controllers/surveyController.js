myApp.controller("SurveyController", ["$scope", "$http", "$location", "AuthFactory", "UserFactory", function($scope, $http, $location, AuthFactory, UserFactory) {
    console.log("SurveyController works");


    var getData = UserFactory.getData();
    var auth = AuthFactory;
    var user;
    auth.$onAuthStateChanged(function(theUser){
      user = theUser;
      console.log(user);
    })

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



    $scope.submitForm = function(survey){
      //TODO: get user information and send in object req.body = {survey: survey, user: user}
      $http.post('/formData/entry', {uname: user, survey: survey}).then(function(){
        console.log('new data posted to', survey.form_title);
      });
    }


    $http.get('/userData', {params: {db: 'users'}})
        .then(function(userData) {
            var unique = true;
            var tempUser;
            auth.$onAuthStateChanged(function(theUser){
              var tempUser = theUser;
              // console.log(user);


            userData.data.forEach(function(member) {
              console.log('this is the user:', tempUser);
                if (member.email == tempUser.email) {
                    unique = false;
                }
            });

            if (unique == true) {
                unique = true;
                $scope.firstLogIn = true;
                

            }
          })
        });


    $scope.firstLogIn = false;

    $scope.popQuestion = function(){
      $scope.firstLogIn = true;
    }

    $scope.closeWindow = function(){
      $scope.firstLogIn = false;
    };



}]);
