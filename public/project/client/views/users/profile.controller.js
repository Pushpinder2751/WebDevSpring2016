/**
 * Created by pushy on 2/16/16.
 */

"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope,$scope,$location, UserService) {

        // how is the $q promise better than this? 
        if(!$rootScope.currentUser){
            console.log("No user yet!");
            $location.path("/login");
            return;
        }
        console.log("In Profile Controller");
        $scope.update = update;
        $scope.user = $rootScope.currentUser;
        //retrieve the currently loggedin user from the $rootScope
        console.log($scope.user);
        var userId = $scope.user._id;
        console.log(userId);

        function update(user){
            console.log("I am in updateUser");
            console.log(user);
            // have to modify this later
            UserService
                .updateUser(userId, user)
                .then(function (response) {
                    console.log("updated response ");
                    console.log(response.data);
                    $scope.user = response.data;

                    UserService
                        .setCurrentUser(response.data);
                });

        }


    }
})();