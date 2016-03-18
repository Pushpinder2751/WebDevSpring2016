module.exports = function(app){
    // do I need to use app below?
    var userModel = require("./models/user.model.js")();
    var formModel = require("./models/form.model.js")();
    //Do I need to make a field model
    // var fieldModel = require("./models/field.model.js")(formModel);

    var userService = require("./services/user.service.server.js")(app, userModel);
    // does formService require userModel? 
    var formService = require("./services/form.service.server.js")(app, formModel);
    // should I be creating new fieldModel for this? 
    var fieldService = require("./services/field.service.server")(app, formModel);
    
}