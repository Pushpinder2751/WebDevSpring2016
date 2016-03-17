/**
 * Created by pushy on 2/16/16.
 */

(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, $location, UserService){
        console.log("I am in LoginController");

        $scope.login = login;


        // how to use UserService here
        function login(user){
            console.log("looking for user");
            console.log(user);
            UserService.findUserByCredentials(user.username, user.password, gotoProfile);
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