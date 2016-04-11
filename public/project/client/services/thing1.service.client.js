"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("ThingService", ThingService)

    function ThingService($http) {

        var api = {
            trackThing: trackThing,
            findThingsForCurrentUser: findThingsForCurrentUser,
            updateThingStatus: updateThingStatus
        };

        return api;



        function trackThing(userId, thingName) {
            console.log("I am in trackThing function");
            // this could be app.post
            return $http.get("/api/project/thing/"+thingName+"/"+userId);
        }
        
        function findThingsForCurrentUser(userId) {
            console.log("going to find things for user");
            return $http.get("/api/project/user/"+userId);
        }

        function updateThingStatus(thing) {
            console.log("updating..");
            return $http.put("/api/project/updateThing", thing);
        }
    }

})();