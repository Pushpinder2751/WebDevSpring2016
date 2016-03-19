/**
 * Created by pushy on 2/16/16.
 */

"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope,$scope,$location, UserService) {
        if(!$rootScope.user){
            console.log("No user yet!");
            $location.path("/login");
            return;
        }
        console.log("In Profile Controller");
        $scope.update = update;
        $scope.user = $rootScope.user;
        //retrieve the currently loggedin user from the $rootScope
        console.log($scope.user);
        var userId = $scope.user._id;

        function update(user){
            console.log("I am in updateUser");
            console.log(user);
            // have to modify this later
            UserService
                .updateUser(userId, user)
                .then(function (response) {
                    console.log("updated response "+ response.data);
                });

        }
        // not sure what I need to do here
        //this should somehow update the view
        /*function updatedUser(doc){
            console.log("Heloo");

            if(doc){
                // why do I need to do this in user service?
                $rootScope.user = doc;
            }
            //$location.url("/profile");
        }*/

    }
})();