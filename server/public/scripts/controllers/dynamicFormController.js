myApp.controller("DynamicFormController", ["$scope", "$http", "$location", 'AuthFactory', function($scope, $http, $location, AuthFactory) {
    console.log("DynamicFormController works");
    $scope.formHistory = [];
    $scope.activeSurvey;


    function getData(database) {
        console.log('getting all data from :', database);
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

    getData('form_history').then(function(allForms){
      $scope.formHistory = allForms;
      console.log('formhistory: ', allForms)
      getData('admin').then(function(adminSettings){
        console.log('adminSettings: ', adminSettings);
        $scope.formHistory.forEach(function(form){
                          console.log('form: ', form);
          if (form.id == adminSettings[0].currentSurvey){

                    $scope.activeSurvey = form;
          }
        })
      });
    })


    $scope.setActive = function(survey){
      console.log(survey);
      $http.put('/formData', survey).then(function(){
        getData('form_history').then(function(data){
          var tempArray = [];
          data.forEach(function(form){
            if (survey.id == form.id){
              tempArray = form;
            }
          })
          console.log('active survey updated: ', tempArray);
          $scope.activeSurvey = tempArray;
        });

        //show survey current results

        //can archive survey results?
      });
    }



    $scope.newForm = {
        formDBref: 0,
        title: "",
        description: "",
        questions: []
    }

    //
    $scope.surveyTitle = {
        formDBref: 0,
        title: "",
        description: ""
    };

    $scope.newSurveyQuestion = {
        title: "",
        description_MultiChoice: "Choose Best Answer:",
        description_Checkbox: "Choose All That Apply:",
        multipleChoice: [{
            check: false,
            option: ""
        }],
        checkbox: [{
            check: false,
            option: ""
        }],
        shortAnswer: ""
    };



    //
    $scope.shortAnswer_selected = false;
    $scope.multipleChoice_selected = false;
    $scope.checkBox_selected = false;


    // resets displayed form on button push
    function resetForm() {
        $scope.shortAnswer_selected = false;
        $scope.multipleChoice_selected = false;
        $scope.checkBox_selected = false;
    }

    // handles form views for different question types
    $scope.selectedDataType = function(dataType) {
        resetForm();
        // console.log('DATA:', dataType)
        switch (dataType) {
            case 'shortAnswer':
                $scope.shortAnswer_selected = true;

                break;
            case 'multipleChoice':
                $scope.multipleChoice_selected = true;

                break;
            case 'checkBox':
                $scope.checkBox_selected = true;

                break;

        }
    }

    $scope.addOption = function() {
        if ($scope.checkBox_selected) {
            console.log('add a checkbox option')
            $scope.newSurveyQuestion.checkbox.push({
                check: false,
                option: ""
            });
        }
        if ($scope.multipleChoice_selected) {
            console.log('add a multiC option')
            $scope.newSurveyQuestion.multipleChoice.push({
                check: false,
                option: ""
            });
        }


    }

    $scope.addQuestion = function(question) {
        if ($scope.checkBox_selected) {
            var newQuestion = new Question(question.title, question.description_Checkbox, question.checkbox, "checkbox");
            // console.log('sending question', newQuestion);
            $scope.newForm.questions.push(newQuestion);
            $scope.newSurveyQuestion = {
                title: "untitled question",
                description_MultiChoice: "Choose Best Answer:",
                description_Checkbox: "Choose All That Apply:",
                multipleChoice: [{
                    check: false,
                    option: "untitled option"
                }],
                checkbox: [{
                    check: false,
                    option: "untitled option"
                }],
                shortAnswer: ""
            };
            // console.log('current form', $scope.newForm);
        }

        $scope.submitForm = function(form) {
                    $http.post('/formData', form)
                    .then(function() {


                      $scope.newForm = {
                          formDBref: 0,
                          title: "Untitled Survey",
                          description: "",
                          questions: []
                      }

                      //
                      $scope.surveyTitle = {
                          formDBref: 0,
                          title: "Untitled Survey",
                          description: ""
                      };

                      $scope.newSurveyQuestion = {
                          title: "untitled question",
                          description_MultiChoice: "Choose Best Answer:",
                          description_Checkbox: "Choose All That Apply:",
                          multipleChoice: [{
                              check: false,
                              option: "untitled option"
                          }],
                          checkbox: [{
                              check: false,
                              option: "untitled option"
                          }],
                          shortAnswer: ""
                      };


                            // console.log('post complete')

                        })
                };


        if ($scope.multipleChoice_selected) {
            var newQuestion = new Question(question.title, question.description_MultiChoice, question.multipleChoice, "multipleChoice");
            // console.log('sending question', newQuestion);
            $scope.newForm.questions.push(newQuestion);
            $scope.newSurveyQuestion = {
                title: "untitled question",
                description_MultiChoice: "Choose Best Answer:",
                description_Checkbox: "Choose All That Apply:",
                multipleChoice: [{
                    check: false,
                    option: "untitled option"
                }],
                checkbox: [{
                    check: false,
                    option: "untitled option"
                }],
                shortAnswer: ""
            };
            // console.log('current form', $scope.newForm);
        }
        if ($scope.shortAnswer_selected) {
            // console.log(question.shortAnswer);
            var newQuestion = new Question(question.title, "", "", "shortAnswer");
            // console.log('sending question', newQuestion);
            $scope.newForm.questions.push(newQuestion);
            // console.log('current form', $scope.newForm);
        }
    }

    function Question(title, desc, options, type) {
        this.title = title;
        this.desc = desc;
        this.options = options;
        this.type = type;

        return this;
    }






}]);
