/**
 * Created by pushy on 2/16/16.
 */

"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope,$scope,$location, UserService) {
        console.log("Hello from RegisterController!");
        $scope.register = register;

        function register(user){
            console.log(user);
            console.log("I am in register function");
            UserService.createUser(user,gotoProfile);
        }

        function gotoProfile(user){
            console.log(user);
            if(user){
               $rootScope.user = user;
                $location.url("/profile");
            }
        }
    }
})();