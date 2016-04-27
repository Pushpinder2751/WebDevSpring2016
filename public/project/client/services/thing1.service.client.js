"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("ThingService", ThingService)

    function ThingService($http) {

        var api = {
            trackThing: trackThing,
            findThingsForCurrentUser: findThingsForCurrentUser,
            updateThingStatus: updateThingStatus,
            unfollowThing: unfollowThing,
            getThingData: getThingData
        };

        return api;



        function trackThing(userId, thingName) {
            console.log("I am in trackThing function");
            // this could be app.post
            return $http.get("/api/project/thing/"+thingName+"/"+userId);
        }
        
        function findThingsForCurrentUser(userId) {
            console.log("going to find things for user");
            return $http.get("/api/project/thing/"+userId);
        }

        function updateThingStatus(thing, user) {
            console.log("updating..");
            var data ={};
            data.thing = thing;
            data.user = user;
            return $http.put("/api/project/updateThing", data);
        }
        
        function unfollowThing(userId, thing) {
            console.log("unfollowing...");
            // for now just sending userId, might need user to create log
            return $http.delete("/api/project/unfollowThing/"+userId+"/"+thing._id);
        }

        function getThingData(thing) {

            return $http.get("/api/project/thingData/"+thing.title);
        }
    }

})();