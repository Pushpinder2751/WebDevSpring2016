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
        // what does var vm = this; mean? 

        // how to use UserService here
        function login(user){
            //console.log("looking for user");
            //console.log(user);
            UserService
                .findUserByCredentials(user.username, user.password)
                .then(function (response) {
                    if(response.data){
                        console.log(response.data);

                            console.log("setting current user");
                           // console.log(response.data);
                        // this is for convenience only. user has to be authenticated using server
                            UserService.setCurrentUser(response.data);
                            $location.url("/profile");

                    }
                },
                    function (error) {
                    console.log("oops!");
                });
        }

        function logout() {
            UserService
                .logout()
                .then(function () {
                    UserService.setCurrentUser(null);
                    $location.url("/home");
                });
        }
        // can I use this funtion up there?
       /* function gotoProfile(response){
            console.log(response);
            if(response){
                // this is done in user.service.client.js by professor. why?
                $rootScope.user = user;
                $location.url("/profile");
            }
        }*/


    }
})();