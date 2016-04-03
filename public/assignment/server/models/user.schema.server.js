//var mongoose = require('mongoose');
module.exports = function(mongoose) {

    var UserSchema = mongoose.Schema(
        {
            // _id: String,
            username: String,
            password: String,
            firstName: String,
            lastName: String,
            email: [String],
            phones: [String]
        }, {collection: "assignment.user"});
    return UserSchema;
};