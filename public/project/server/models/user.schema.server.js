//var mongoose = require('mongoose');
module.exports = function(mongoose) {

    var UserSchema = mongoose.Schema(
        {
            // _id: String,
            username: String,
            password: String,
            firstName: String,
            lastName: String,
            emails: [String],
            phones: [String],
            roles: [String]
        }, {collection: "project.user"});
    return UserSchema;
};

/*
{
    "username": "bob",
    "password": "bob",
    "firstName": "bob",
    "lastName": "bob",
    "emails": ["bob@b"],
    "phones": ["123"],
    "roles":["admin"]

}*/
