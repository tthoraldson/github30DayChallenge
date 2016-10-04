myApp.factory('UserFactory', ['$http', function($http) {

    var provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('user');
    //TODO: Make post to db
    //TODO: write get function here.


    function checkNewUser(user) {
        $http.get('/userData', {
                params: {
                    db: 'users'
                }
            })
            .then(function(userData) {
                var unique = true;
                userData.data.forEach(function(member) {
                    if (member.email == user.email) {
                        unique = false;
                    }
                });

                if (unique == true) {
                    postUser(user);
                    // console.log('THIS IS THE USER', user.github.cachedUserProfile);

                }
            });
    }

    function postUser(user) {
        $http.post('/userData', user).then(function() {
            console.log('post successful');
        });
        // console.log(user.cachedUserProfile);
    }



    function signIn() {
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            var token = result.credential.accessToken;
            console.log('This is the users token to identify them on Firebase:', token);
            // The signed-in user info.
            var user = result.user;
            // console.log('this is the user:', user);
            console.log('this is the userID:', user.uid);

            checkNewUser(user);

            
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }



    function signOut() {
        firebase.auth().signOut().then(function() {
            console.log('Sign-out successful.');
        }, function(error) {
            console.log('error signing out');
        });
    };


    function getData(database) {
        var promise = $http.get('/userData', { //SELECT * FROM database
            params: {
                db: database
            }
        }).then(function(data) {
            // console.log('GET COMPLETE: Updated $scope.' + database);
            return data.data;
        });

        return promise;
    };


    return {
        signIn: function() {
            return signIn;
        },
        signOut: function() {
            return signOut;
        },
        getData: function() {
            return getData;
        }

    };
}]);
