myApp.controller("DynamicFormController", ["$scope", "$http", "$location", 'AuthFactory', function($scope, $http, $location, AuthFactory) {
    console.log("DynamicFormController works");

    //
    $scope.surveyTitle = {
        formDBref: 0,
        title: "Untitled Survey",
        descriptino: ""
    };

    $scope.surveyQuestions = [{
        title: "untitled question",
        multipleChoice: [{
            check: false,
            option: "untitled option"
        }],
        checkbox: [{
            check: false,
            option: "untitled option"
        }],
        shortAnswer: ""
    }];



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
      }
      if($scope.multipleChoice_selected){
        console.log('add a multiC option')
      }


    }
}]);
