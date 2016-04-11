var mock_things = require("./thing.mock.json");

var q = require ("q");

module.exports = function(db, mongoose) {

    var ThingSchema = require("./thing.schema.server.js")(mongoose);

    //model for schema
    var thingModel = mongoose.model('thingModel', ThingSchema);

    var api = {
        trackThing: trackThing,
        findThingsForCurrentUser: findThingsForCurrentUser,
        updateThingStatus: updateThingStatus,
        unfollowThing: unfollowThing
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

    function updateThingStatus(thing) {
        var deferred = q.defer();

        thingModel.findOneAndUpdate({_id: thing._id}, {$set: {status: thing.status}}, {new: true}, function (err, doc) {
            if(err){
                console.log("could not update status");
                deferred.reject(err);
            }else{
                // have to do something here to update in the device also
                console.log("updated in db");
                console.log(doc);
                deferred.resolve(doc);
            }
        });
        /*thing.save(function (err, doc) {
            if(err){
                console.log("update error");
                deferred.reject(err);
            }else{
                console.log("updated");
                console.log(doc);
                deferred.resolve(doc);
            }
*/
            return deferred.promise;
    }

    function unfollowThing(userId, thingId) {
        var deferred = q.defer();

        thingModel.findOne({_id: thingId}, function (err, doc) {
            if(err){
                deferred.reject(err);
            }else{
                var thing = doc;
                console.log("found thing")
                console.log(thing);
                var index = thing.userId.indexOf(userId);
                console.log(index);
                if(index > -1){
                    thing.userId.splice(index, 1);
                    thing.save(function (err, doc) {
                        if(err){
                            console.log("update error");
                            deferred.reject(err);
                        }else{
                            console.log("updated");
                            console.log(doc);
                            deferred.resolve(doc);
                        }});
                }else{
                    console.log("userId not found");
                }

            }
        });
        return deferred.promise;

    }

};