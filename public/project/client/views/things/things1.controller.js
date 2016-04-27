"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ThingsController", ThingsController)
    
    function ThingsController($scope, $location, $rootScope, ThingService) {
        console.log("hello from Things1controller");

        var vm = this;
        $scope.selected = -1; // initially

        var userId = -1;
        if(!$rootScope.currentUser){
            console.log("No user yet!");
            $location.path("/login");
            return;
        }else{
            userId = $rootScope.currentUser._id;
            // call something like things for current user
            thingsForCurrentUser();
        }

        function thingsForCurrentUser() {
            console.log("looking up things");
            ThingService
                .findThingsForCurrentUser(userId)
                .then(function (response) {
                    console.log("got things from server");
                    console.log(response.data);
                    // do something like add things to scope here
                    vm.things = response.data;
                })
        }



        // register functions 
        vm.trackThing = trackThing;
        vm.selectThing = selectThing;
        vm.unfollowThing = unfollowThing;
        

        function trackThing(thing) {
            console.log("Track this");
            console.log(thing);

            for(var t in vm.things){
                if(vm.things[t].title == thing){
                    console.log("already tracking");
                    return;
                }
            }
            // update the status in server as well
            // this will be used to eventually push it to the 
            // device itself
            ThingService
                .trackThing(userId,thing)
                .then(function (response) {
                    console.log("back from ThingService");
                    console.log(response.data);
                    thingsForCurrentUser();
                })
        }
        
        function selectThing(thing) {
            console.log("SelectThing ");
            console.log(thing);
            $rootScope.thing = thing;
            $location.path("/thing/{{thing._id}}/fields");
        }

        function unfollowThing(thing) {
            console.log("user does not want to follow :"+thing);

            ThingService
                .unfollowThing(userId, thing)
                .then(function (response) {
                    console.log("deleted in db");
                    console.log(response.data);
                    thingsForCurrentUser();
                });
        }
        



    }
    
})();