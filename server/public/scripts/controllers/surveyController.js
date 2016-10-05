myApp.controller("SurveyController", ["$scope", "$http", "$location", "AuthFactory", "UserFactory", function($scope, $http, $location, AuthFactory, UserFactory) {
    console.log("SurveyController works");


    var getData = UserFactory.getData();
    $scope.signIn = UserFactory.signIn();
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
                    $scope.firstLogIn = false;
                }
            });

            if (unique == true) {
                unique = true;
              $scope.firstLogIn = true;
                $scope.newUser = tempUser

            }

          } else {
            $scope.askLogin = true;
            // $scope.firstLogIn = true;
            // signIn();
          }

        })
      });

    $scope.firstLogIn = false;
    $scope.showThanks = false;
    $scope.askLogin = false;


    $scope.login = function(){
      $scope.signIn();
      $scope.askLogin = false;
      $scope.firstLogIn = true;
    }


    $scope.popQuestion = function(){
      $scope.firstLogIn = true;
    }

    $scope.closeWindow = function(){
      $scope.firstLogIn = false;
      $scope.showThanks = false;
      $scope.askLogin = false;
    };

    $scope.updateUser = function(newInfo){
      $scope.newName = newInfo.name;
      var tempUser;
      var tempObj;
      auth.$onAuthStateChanged(function(theUser){
        tempUser = theUser;

        if(tempUser != null){
        newInfo.oldEmail = tempUser.email;
        $http.put('/userData', newInfo).then(function(){
        console.log('did something');
          });
        $scope.firstLogIn = false;
        $scope.showThanks = true;

        var timer = setTimeout(showChanger, 3000);

        function showChanger(){
          $scope.$apply(function() {
              $scope.showThanks = false;
          });
        }// $scope.showThanks = false;
      }

      })

    }



}]);
