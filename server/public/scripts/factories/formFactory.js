myApp.factory('FormFactory', ['$http', function($http) {

  var formData = $http.get('/userData', {params: {db: 'form_history'}}).then(function(data){

  });

  var tempObj;

  function formResults(formIDs){
    var promise = $http.get('/formData/results', {params: {formIDs: formIDs}}).then(function(data){
      console.log('THIS IS ASDSDFASd', data);
      tempObj = data;
    });
    return promise;
  }





  return {
    allFormData: function() {
        return formData;
  },
    updateFormResults: function(){
      return formResults;
    },
    formResponses: function() {
        return tempObj;
    }
}


}]);
