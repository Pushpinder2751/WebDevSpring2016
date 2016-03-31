// adding db and mongoose here too
module.exports = function(app, db, mongoose){
    // do I need to use app below?
    // I am adding db and mongoose references here , but do I need them in here? why?
    var userModel = require("./models/user.model.js")(db, mongoose);
    var formModel = require("./models/form.model.js")(db, mongoose);
    //Do I need to make a field model
    // var fieldModel = require("./models/field.model.js")(formModel);

    var userService = require("./services/user.service.server.js")(app, userModel);
    // does formService require userModel? 
    var formService = require("./services/form.service.server.js")(app, formModel);
    // should I be creating new fieldModel for this? 
    var fieldService = require("./services/field.service.server")(app, formModel);
    
};