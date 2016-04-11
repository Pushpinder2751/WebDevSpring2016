var mock_things = require("./thing.mock.json");

var q = require ("q");

module.exports = function(db, mongoose) {

    var ThingSchema = require("./thing.schema.server.js")(mongoose);

    //model for schema
    var thingModel = mongoose.model('thingModel', ThingSchema);

    var api = {
        trackThing: trackThing,
        findThingsForCurrentUser: findThingsForCurrentUser
    };
    return api;
    
    // have to add userid to the list of users
    function trackThing(thing,userId) {
        console.log("got to thingModel");
        console.log("thing "+thing+" user "+userId);
        var deferred = q.defer();
            thingModel.update(
                {title: thing},
                {$push: {"userId": userId}},
                function (err, stats) {
                    if(err){
                        console.log("error");
                        console.log(err);
                        deferred.reject(err);
                    }else{
                        console.log("updated");
                        console.log(stats);
                        deferred.resolve("sweet")
                    }

                }
            );
        //deferred.resolve("sweet");
        return deferred.promise;
        
    }
    
    function findThingsForCurrentUser(userId) {
        var deferred = q.defer();

        thingModel.find({"userId" : userId},
            function (err, doc) {
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

};