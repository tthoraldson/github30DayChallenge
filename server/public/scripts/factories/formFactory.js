myApp.factory('FormFactory', ['$http', function($http) {

  var formData = $http.get('/userData', {params: {db: 'form_history'}}).then(function(data){

  });

  function formResults(formIDs){
    var formResults = $http.get('/formData/results', {params: {formIDs: formIDs}}).then(function(data){
      console.log('THIS IS ASDSDFASd', data);
    });
    return formResults
  }





  return {
    allFormData: function() {
        return formData;
  },
    formResults: function(){
      return formResults;
    }
  //   sendEmail: function() {
  //       return sendEmail;
  //   }
}


}]);
