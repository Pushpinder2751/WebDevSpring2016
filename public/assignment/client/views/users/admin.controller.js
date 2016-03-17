"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController)

    function AdminController($scope, $location, $rootScope){
        console.log("Hello from AdminController");

        if(!$rootScope.user){
            console.log("No user yet!");
            $location.path("/login");
            return;
        }else if($rootScope.user.roles.indexOf("admin") < 0 ){
            console.log("Not an Admin!");
            $location.url("/home");
            return;
        }

    }
})();
