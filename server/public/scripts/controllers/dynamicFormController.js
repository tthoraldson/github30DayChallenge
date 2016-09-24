myApp.controller("DynamicFormController", ["$scope", "$http", "$location", 'AuthFactory', function($scope, $http, $location, AuthFactory) {
  console.log("DynamicFormController works");

  //
  $scope.surveyTitle = {
    title: "Untitled Survey",
    descriptino: ""
  };

  //
  $scope.surveyQuestions = [{
    title: "untitled question",
    multipleChoice: [{check: false, option: "yes"},{check: false, option: "no"},{check: false, option: "maybe"}, {check: false, option: "so"}],
    checkbox: [{check: false, option: "eggs"}, {check: false, option: "sushi"}, {check: false, option: "kalamari"},{check: false, option: "corn"}],
    shortAnswer: ""
  }];

  //
  $scope.shortAnswer_selected = false;
  $scope.multipleChoice_selected = false;
  $scope.checkBox_selected = false;


  //
  function resetForm(){
  $scope.shortAnswer_selected = false;
  $scope.multipleChoice_selected = false;
  $scope.checkBox_selected = false;
  }

  //
  $scope.selectedDataType = function(dataType){
    resetForm();
    console.log('DATA:', dataType)
    switch(dataType){
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

}]);
