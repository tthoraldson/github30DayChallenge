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
              tempUser = theUser;
              // console.log(user);

              if(tempUser != null){
            userData.data.forEach(function(member) {


                if (member.email == tempUser.email) {
                    unique = false;
                }
            });

            if (unique == true) {
                unique = true;
                $scope.firstLogIn = true;
                $scope.newUser = tempUser

            }
          }})
      });


    $scope.firstLogIn = false;

    $scope.popQuestion = function(){
      $scope.firstLogIn = true;
    }

    $scope.closeWindow = function(){
      $scope.firstLogIn = false;
    };

    //
    // function EmailObject(name, email, oldEmail){
    //   this.name = name;
    //   this.email = email;
    //   this.oldEmail = oldEmail;
    // }

    $scope.updateUser = function(newInfo){
      var tempUser;
      var tempObj;
      auth.$onAuthStateChanged(function(theUser){
        tempUser = theUser;

        newInfo.oldEmail = tempUser.email;
        $http.put('/userData', newInfo).then(function(){
        console.log('did something');
          });
      })

    }



}]);
