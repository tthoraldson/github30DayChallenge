myApp.controller("LoginController", ["$scope", "$http", "$location", 'AuthFactory', 'UserFactory', function($scope, $http, $location, AuthFactory, UserFactory) {
  console.log("LoginController works");

  var userFactory = UserFactory;
  var signIn = userFactory.signIn();
  var signOut = userFactory.signOut();



  // var provider = new firebase.auth.GithubAuthProvider();
  //
  // firebase.auth().signInWithPopup(provider).then(function(result) {
  //   // This gives you a GitHub Access Token. You can use it to access the GitHub API.
  //   var token = result.credential.accessToken;
  //   // The signed-in user info.
  //   var user = result.user;
  //   console.log('this is the user:', user);
  // }).catch(function(error) {
  //   // Handle Errors here.
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   // The email of the user's account used.
  //   var email = error.email;
  //   // The firebase.auth.AuthCredential type that was used.
  //   var credential = error.credential;
  //   // ...
  // });
  $scope.logIn = function(){
    signIn();
  }

  $scope.logOff = function(){
  signOut();
}

}]);
