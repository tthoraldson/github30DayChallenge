myApp.controller("DynamicFormController", ["$scope", "$http", "$location", 'AuthFactory', 'UserFactory', 'FormFactory', function($scope, $http, $location, AuthFactory, UserFactory, FormFactory) {
    // console.log("DynamicFormController works");
    $scope.formHistory = [];
    $scope.activeSurvey;
    $scope.submitSurveyWindow = false;
    var getData = UserFactory.getData();

    getData('form_history')
        .then(function(data) {
            $scope.formHistory = data;
            console.log('what is this:', $scope.formHistory)
        })


    $scope.setActive = function(survey) {
        // console.log(survey);
        $http.put('/formData', survey)
            .then(function() {
                findActive();

                //show survey current result?
                //can archive survey results?
            });
    }


    function findActive() {
        getData('admin')
            .then(function(admin) {
                // console.log('ADMIN', admin);
                getData('form_history')
                    .then(function(data) {
                      $scope.activeSurvey = [];
                        var tempArray = [];
                        data.forEach(function(form) {
                            // console.log('DATAAA', form)
                            console.log('working');
                            if (admin[0].currentsurvey == form.id) {
                                console.log('updating currentsurvey to ', form.form_title)
                                tempArray = form;
                                $scope.activeSurvey = tempArray;
                            }
                        })
                    })

            });
    }
    findActive();


    var formData = FormFactory.allFormData();
    formData.then(function(data) {
        console.log('HEYEYEYEYYEYE', data);
    })

    var formResults = FormFactory.updateFormResults();
    // formResults([2, 4])
    //     .then(function(data) {
    //         var responses = FormFactory.formResponses();
    //         console.log('this is the shit:', responses);
    //     })





    $scope.newForm = {
        formDBref: 0,
        title: "",
        description: "",
        questions: []
    }


    $scope.surveyTitle = {
        formDBref: 0,
        title: "",
        description: ""
    };


    $scope.newSurveyQuestion = {
        title: "",
        description_MultiChoice: "Choose All That Apply:",
        description_Checkbox: "Choose Best Answer:",
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


    $scope.shortAnswer_selected = false;
    $scope.multipleChoice_selected = false;
    $scope.checkBox_selected = false;

    $scope.activeSurveyResponses = [{
            question: "titletest",
            options: [],
            answers: [],
        }]
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
            // console.log('add a checkbox option')
            $scope.newSurveyQuestion.checkbox.push({
                check: false,
                option: ""
            });
        }
        if ($scope.multipleChoice_selected) {
            // console.log('add a multiC option')
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

          $http.put('/formData', {id: 6})
              .then(function() {
                  findActive();

                  console.log('running? .put');
              });
              // console.log('turning activeSurvey into: ', form);


            $http.post('/formData', form)
                console.log('running? .post')
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


                    console.log('post complete')

                })
        };
        $scope.submitFormMakeActive = function(form) {
          $scope.dynamicForm_container = false;
          $http.put('/formData', {id: 12}) //HERE
              .then(function() {
                  findActive();

                  console.log('running? .put');
              });
              // console.log('turning activeSurvey into: ', form);


            $http.post('/formData', form)
                console.log('running? .post')
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
                        description_MultiChoice: "Choose All That Apply:",
                        description_Checkbox: "Choose Best Answer:",
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


                    console.log('post complete')

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
