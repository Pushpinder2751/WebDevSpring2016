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

        function register(currentUser){
            console.log(currentUser);
            console.log("I am in register function");
            UserService
                .createUser(currentUser)
                .then(function (response) {
                    console.log(response.data);
                    UserService
                        .setCurrentUser(response.data);

                            $location.url("/profile");


                })

        }

       /* function gotoProfile(user){
            console.log(user);
            if(user){
               $rootScope.currentUser = user;
                $location.url("/profile");
            }
        }*/
    }
})();