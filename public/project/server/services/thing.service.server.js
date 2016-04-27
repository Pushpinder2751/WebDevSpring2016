// have to add something like thingModel below
module.exports = function (app, thingModel) {
    app.get("/api/project/thing/:thing/:userId", trackThing);
    app.get("/api/project/thing/:userId", findThingsForCurrentUser);
    app.put("/api/project/updateThing", updateThingStatus);
    app.delete("/api/project/unfollowThing/:userId/:thing", unfollowThing);
    app.get("/api/project/thingData/:thing", getThingData);

    app.get("/edison", sendUpdateToBoard);
    app.get("/edison/initialUpdate", initialUpdate);
    app.post("/edison/lightSensor", lightSensorData);
    app.post("/edison/tempSensor", tempSensorData);
    app.post("/edison/soundSensor", soundSensorData);
    var updateFlag = false;
    var updatedThing = {};
    var update;
    
    // this function is called when the board just initializes
    function initialUpdate(req, res) {
        console.log("sending initial update: ");
        thingModel.getAllThings()
            .then(
                //return all things if promise if resolved
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
    
    function sendUpdateToBoard(req, res) {
        // receive values from the board here

        if(updateFlag){
            //send updates here
            update = {
                lcd: {
                    status: "on",
                    value: "i got an update"
                },
                data : updatedThing
                
            };
            res.json(update);
            // reset the global variable for new values
            updatedThing = {};
            // change the flag for next update
            updateFlag = false;
            
        }else{
            update = {
                lcd: {
                    status: "on",
                    value: "nothing to update"
                },
                data : {
                }

       };
            res.json(update);
        }
    };

    // have to record this data; 
    function lightSensorData(req, res) {
        console.log("got lightsensor data");
        console.log(req.body);
        var data = {};
        data.thing = "lightSensor";
        data.details = {
            value: req.body.value,
            time: Date.now()
        };
        thingModel.dataUpdate(data)
            .then(function (doc) {
                console.log("db updated with data");

            },
            function (err) {
                res.status(400).send(err);
            });
        res.json({light: "getting data"});

    }

    function tempSensorData(req, res) {
        console.log("got temperature sensor data");
        console.log(req.body);
        var data = {};
        data.thing = "tempSensor";
        data.details = {
            value: req.body.value,
            time: Date.now()
        };
        thingModel.dataUpdate(data)
            .then(function (doc) {
                    console.log("db updated with data");

                },
                function (err) {
                    res.status(400).send(err);
                });
        res.json({temp : "getting data"});

    }

    function soundSensorData(req, res) {
        console.log("got sound sensor data");
        console.log(req.body);
        var data = {};
        data.thing = "soundSensor";
        data.details = {
            value: req.body.value,
            time: Date.now()
        };
        thingModel.dataUpdate(data)
            .then(function (doc) {
                    console.log("db updated with data");

                },
                function (err) {
                    res.status(400).send(err);
                });
        res.json({sound: "getting data"});

    }








    function trackThing(req, res) {
        var thing = req.params.thing;
        var userId = req.params.userId;
        console.log("thing "+thing);
        console.log("userId "+userId);
        //res.json("done");
        thingModel.trackThing(thing, userId)
            .then(function (thing) {
                console.log("came back with: "+thing);
                res.json("ready to return");
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function findThingsForCurrentUser(req, res) {
        var userId = req.params.userId;
        console.log("lookup up things for user "+userId);
        thingModel.findThingsForCurrentUser(userId)
            .then(function (thing) {
                console.log("found stuff");
                console.log(thing);
                res.json(thing);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    // collecting both thing and user data
    // as I might want to make a log database later
    function updateThingStatus(req, res) {
        var data = req.body;
        var thing = data.thing;
        var user = data.user;
        console.log("I am about to update status");
        console.log(thing);
        console.log(user);
        thingModel.updateThingStatus(thing)
            .then(function (thing) {
                console.log("sending back update");
                // not sure of this yet
                thingModel.logUpdate(user, thing)
                    .then(function (doc) {
                        console.log("updated log");

                    }, function (err) {
                        console.log("could not update log");
                        res.status(400).send(err);
                    });
                // on a successful update in the db, set updateFlag to true
                // to actually send device the update.
                updateFlag = true;
                updatedThing = thing;

                res.json(thing)
            },function (err) {
                res.status(400).send(err);
            });
    }

    function unfollowThing(req, res) {
        var userId = req.params.userId;
        var thingId = req.params.thingId;
        console.log("unfollowing ..");
        console.log(userId);
        console.log(thingId);
        thingModel.unfollowThing(userId, thingId)
            .then(function (doc) {
                console.log("unfollowed");
                res.json(doc);
            },function (err) {
                res.status(400).send(err);
            });
    }
    
    function getThingData(req, res) {
        var thingName = req.params.thing;
        console.log("in getThingdata.. for :"+thingName);
        thingModel.getThingData(thingName)
            .then(function (doc) {
                console.log("gotThingData");
                res.json(doc);
                
            },function (err) {
                res.status(400).send(err);
            });
        
    }
}