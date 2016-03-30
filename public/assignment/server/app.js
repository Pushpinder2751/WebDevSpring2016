
    module.exports = function (app, db, mongoose) {
        var userModel = require("./models/user.model.js")(db, mongoose);
        var formModel = require("./models/form.model.js")(db, mongoose);


    var userService = require("./services/user.service.server.js")(app, userModel);
    // does formService require userModel? 
    var formService = require("./services/form.service.server.js")(app, formModel);
    // should I be creating new fieldModel for this? 
    var fieldService = require("./services/field.service.server")(app, formModel);
    
};