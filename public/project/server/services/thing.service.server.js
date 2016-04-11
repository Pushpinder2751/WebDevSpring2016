// have to add something like thingModel below
module.exports = function (app, thingModel) {
    app.get("/api/project/thing/:thing/:userId", trackThing);
    app.get("/api/project/user/:userId", findThingsForCurrentUser);
    app.put("/api/project/updateThing", updateThingStatus);


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

    function updateThingStatus(req, res) {
        var thing = req.body;
        console.log("I am about to update status");
        console.log(thing);
        res.json("updated");
    }
}