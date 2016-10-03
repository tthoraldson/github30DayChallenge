(function() {
    'use strict';

    angular.module('myApp').factory('AuthFactory', ['$firebaseAuth', Auth]);

    function Auth($firebaseAuth) {
      // maybe write a thing maybe?
        return $firebaseAuth();
    }
})();
