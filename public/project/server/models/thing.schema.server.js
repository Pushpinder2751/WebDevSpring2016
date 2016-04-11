module.exports = function (mongoose) {

    var ThingSchema = mongoose.Schema({

        title: String,
        status: String,
        type: String,
        userId: [String],
        update: Date
    },{collection: 'project_thing'});
    return ThingSchema;
}

/*
have to add my things manually for now
ideally, admin could do this from the webApp
db.project_thing.insert({
    title: "led",
    status: "on",
    type: "input",
    userId: ["234"],
    update: new Date()
})*/
