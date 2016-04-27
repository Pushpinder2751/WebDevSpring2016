var mock_things = require("./thing.mock.json");

var q = require ("q");

module.exports = function(db, mongoose) {

    var ThingSchema = require("./thing.schema.server.js")(mongoose);

    //model for schema
    var thingModel = mongoose.model('thingModel', ThingSchema);

    var LogSchema = require("./log.schema.server")(mongoose);
    var logModel = mongoose.model('logModel', LogSchema);

    var DataSchema = require("./data.schema.server")(mongoose);
    var dataModel = mongoose.model('dataModel', DataSchema);


    var api = {
        trackThing: trackThing,
        findThingsForCurrentUser: findThingsForCurrentUser,
        updateThingStatus: updateThingStatus,
        unfollowThing: unfollowThing,
        logUpdate: logUpdate,
        dataUpdate: dataUpdate,
        getAllThings: getAllThings,
        getThingData: getThingData
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
        console.log("looking up things for currentUser");
        console.log(userId);
        var deferred = q.defer();

        thingModel.find({"userId" : userId},
            function (err, doc) {
                if(err){
                    console.log("error");
                    console.log(error);
                    deferred.reject(err);
                }else{
                    console.log(doc);
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    // the update function is very important
    // this is the function which will update the device
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
    
    function logUpdate(user, thing) {
        console.log("in log update");
        var deferred = q.defer();

        var log = {
            user: user.username,
            thing: thing.title,
            status: thing.status,
            update: Date.now()
        };

        logModel.create(log, function (err, doc) {

           if(err){
               deferred.reject(err);
           } else{
               deferred.resolve(doc);
           }
        });

        return deferred.promise;
    }

    function dataUpdate(data) {
        console.log("to update");
        console.log(data);
        var deferred = q.defer();

        // needs fixing still, need to remove the _id off
        // the inside array. 
        dataModel.update(
            {thing: data.thing},
            {$push: {"details": data.details}},
            function (err, doc) {
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
    }

    function getAllThings() {
        var deferred = q.defer();

        thingModel.find(
            function (err, things) {
                if(err){
                    console.log(err);
                    deferred.reject(err);
                }else {
                    console.log("things :");
                    console.log(things);
                    deferred.resolve(things);
                }
            });
        return deferred.promise;
    }
    
    function getThingData(thingName) {
        var deferred = q.defer();

        dataModel.find({thing: thingName},
            function (err, doc) {
                if(err){
                    console.log(err);
                    deferred.reject(err);
                }else{
                    console.log("got Thing data");
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

};