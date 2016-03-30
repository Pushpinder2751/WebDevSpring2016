
var mock = require("./user.mock.json");
// where is function(app) used?
module.exports = function(app, db, mongoose){

    // load user schema
    // var UserSchema = require("./user.schema.server")(mongoose);

    var api = {
        // generic data model requirements which all models must follow
        createUser: createUser,
        findAllUser: findAllUser,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        // requirements specific to user model
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
        // add more if you need to
    };
    return api;

    // Create of CRUD
    function createUser (user) {
        var newUser = {
            _id: (new Date).getTime(),
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            password: user.password
        };
        mock.push(newUser);
        return newUser;
    }

    function findAllUser () {
        return mock;
    }

    function findUserById (userId) {
        userId = parseInt(userId);
       // console.log(userId);
        for(var i in mock){
            if(mock[i].id === userId){
                return mock[i];
            }
        }
        // if no user is found
        console.log("No user by this userId!");
        return null;
    }

    // Update of CRUD
    function updateUser (userId, user) {
        //userId = userId;
        console.log(userId);
        for(var i in mock){
            // it might be _id here
            if(mock[i]._id == userId){
                mock[i].username = user.username;
                mock[i].firstName = user.firstName;
                mock[i].lastName = user.lastName;
                mock[i].password = user.password;
                console.log("updated user");
                //console.log(mock[i]);
                return mock[i];
            }
        }

    }

    function deleteUser (userId){
        userId = parseInt(userId);
        for(var i in mock){
            if(mock[i]._id == userId){
                mock.splice(i, 1);
                return mock;
            }
        }
    }

    function findUserByUsername(username){
        for(var i in mock){
            if(mock[i].username === username){
                return mock[i];
            }
        }
        // if user is not found
        console.log("no user by this username");
        return null;
    }

    function findUserByCredentials(credentials) {
        for (var u in mock){
            if( mock[u].username === credentials.username &&
                mock[u].password === credentials.password){
                console.log(mock[u]);
                return mock[u];
            }
        }
        // if no user is found;
        console.log("no user found by credentials");
        return null;
    }



};