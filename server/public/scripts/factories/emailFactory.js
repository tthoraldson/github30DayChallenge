myApp.factory('EmailFactory', ['$http', function($http) {



// sends email to all users in db
  var allEmails = function(userData, emailInfo){
    var emailInfo = emailInfo;
      var emailArray = []
      userData.forEach(function(user){
        console.log('this is the user:', user.email);
        emailArray.push(user.email);
      });
      var tempString = '';
      emailArray.forEach(function(email, index){
        if(index != emailArray.length - 1){
          tempString += email + ', ';
        } else {
          tempString += email;
        }
      })
      console.log(tempString);
      emailInfo.sendAddress = tempString;
       return emailInfo;
  }


    function sendEmail(emailInfo) {

      // emailInfo.displayName = $scope.user.displayName;
        $http.post('/email', emailInfo).then(function(response) {
            console.log("email success response: ", response);
        });
    };


  return {
    allEmails: function() {
        return allEmails;
  },
    sendEmail: function() {
        return sendEmail;
    }
}

}]);
