myApp.controller("DynamicFormController", ["$scope", "$http", "$location", 'AuthFactory', function($scope, $http, $location, AuthFactory) {
    console.log("DynamicFormController works");

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
        console.log('DATA:', dataType)
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

    $scope.addOption = function(){
      if($scope.checkBox_selected){
        console.log('add a checkbox option')
        $scope.newSurveyQuestion.checkbox.push({check: false, option: "df"});
      }
      if($scope.multipleChoice_selected){
        console.log('add a multiC option')
        $scope.newSurveyQuestion.multipleChoice.push({check: false, option: "df"});
      }


    }

    $scope.addQuestion = function(question){
      if($scope.checkBox_selected){
        var newQuestion = new Question(question.title, question.description_Checkbox, question.checkbox, "checkbox");
        console.log('sending question', newQuestion);
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
        console.log('current form', $scope.newForm);
      }

      if($scope.multipleChoice_selected){
        var newQuestion = new Question(question.title, question.description_MultiChoice, question.multipleChoice, "multipleChoice");
        console.log('sending question', newQuestion);
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
        console.log('current form', $scope.newForm);
      }
      if($scope.shortAnswer_selected){
          console.log(question.shortAnswer);
                  var newQuestion = new Question(question.title, "", "", "shortAnswer");
                  console.log('sending question', newQuestion);
                  $scope.newForm.questions.push(newQuestion);
                  console.log('current form', $scope.newForm);
      }
    }

    function Question(title, desc, options, type){
      this.title = title;
      this.desc = desc;
      this.options = options;
      this.type = type;

      return this;
    }
}]);
