// have to add something like thingModel below
module.exports = function (app, thingModel) {
    app.get("/api/project/thing/:thing/:userId", trackThing);
    app.get("/api/project/user/:userId", findThingsForCurrentUser);
    app.put("/api/project/updateThing", updateThingStatus);
    app.delete("/api/project/unfollowThing/:userId/:thingId", unfollowThing);

    app.get("/edison", sendUpdateToBoard);
    app.post("/edison/lightSensor", lightSensorData);
    var updateFlag = false;
    var updatedThing = {};
    var update;
    function sendUpdateToBoard(req, res) {
        // receive values from the board here

        if(updateFlag){
            //send updates here
            update = {
                lcd: {
                    status: "on",
                    value: "i got an update"
                },
                data : {
                    title: "lightSensor",
                    status: "off"
                }
                
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
                    title: "lightSensor",
                    status: "on"
                }

       };
            res.json(update);
        }
    };

    function lightSensorData(req, res) {
        console.log("got lightsensor data");
        console.log(req.body);
        res.json({light: "getting data"});

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
}