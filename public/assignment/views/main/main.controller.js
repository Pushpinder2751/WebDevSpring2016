
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);


    function MainController($location, $scope) {
        console.log("Path: " + $location.path());
        $scope.$location = $location;
        var path = $location.path();
    }



})();
