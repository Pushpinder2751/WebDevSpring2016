/**
 * Created by pushy on 2/16/16.
 */

"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope,$scope,$location, UserService) {
        console.log("In Profile Controller");
        $scope.update = update;
        $scope.user = $rootScope.user;
        //retrieve the currently loggedin user from the $rootScope
        console.log($scope.user);
        var userId = $scope.user._id;

        function update(user){
            console.log("I am in updateUser");
            console.log(user);
            UserService.updateUser(userId,user,updatedUser);

        }
        // not sure what I need to do here
        function updatedUser(){
            console.log("Heloo");
            //$location.url("/profile");
        }

    }
})();