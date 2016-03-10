/**
 * Created by pushy on 2/16/16.
 */

"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController)

        function HeaderController($scope, $location, $rootScope){
            console.log("HeaderController");

            $scope.isLoggedIn = isLoggedIn;
            $scope.logout = logout;

            // get to know more about this
            function isLoggedIn() {
                return ($location.url() != '/home' && $location.url() != '/login' && $location.url() != '/register');
            }

            function logout(user){
                delete $rootScope.user;
                $location.url("/");
            }

        }
})();
