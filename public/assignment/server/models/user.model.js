
var mock = require("./user.mock.json");

// load q promise library
// needed as the usermodel calls are no more synchronous
var q = require ("q");
//var mongoose = require("mongoose");

// where is function(app) used?
module.exports = function(db, mongoose){

    // load user schema
     var UserSchema = require("./user.schema.server.js")(mongoose);

    // create model for schema,
     var userModel = mongoose.model('userModel', UserSchema);

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
    // now creates user in db
    function createUser (user) {
        // old way
        /*var newUser = {
            _id: (new Date).getTime(),
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            password: user.password
        };
         return newUser;
        mock.push(newUser);*/

        // use q to defer the response
        var deferred = q.defer();
        //user.phones = [123];
        // should be a better way to do this?
        //user.email = [user.email];

       // have to do something about name
        var newUser = {
            "username": user.username,
            "password": user.password,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "emails" : [user.email],
            "phones" : [user.phones],
            "roles" : user.roles
        };
        console.log("final create user1")
        console.log(newUser);

        // insert new user with mongoose user model's create()
        // the doc will have _id created for user by mongo
        userModel.create(newUser, function (err, doc) {

            if(err){
                //reject promise if error
                deferred.reject(err);
            }else{
                // resolve promise
                //console.log("create user");
                //console.log(doc);
                deferred.resolve(doc);
            }

        });

        // return a promise
        return deferred.promise;

    }

    function findAllUser () {
       // return mock;
        // not sure about this yet
        var deferred = q.defer();
        userModel.find(
            function (err, users) {
            if(err){
                console.log(err);
                deferred.reject(err);
            }else {
                deferred.resolve(users);
            }
        })
        return deferred.promise;

    }

    // now looks up db
    function findUserById (userId) {
        //userId = parseInt(userId);
       // console.log(userId);

        // old way
        /*for(var i in mock){
            if(mock[i].id === userId){
                return mock[i];
            }
        }
        // if no user is found
        console.log("No user by this userId!");
        return null;*/

        var deferred = q.defer();
        userModel.findById(userId, function (err, doc) {
            if(err){
                deferred.reject(err);
            }else{
                //console.log("I got till here");
                //console.log(doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    // Update of CRUD
    function updateUser (userId, user) {
        //userId = userId;
        console.log("in update user");
        //console.log(userId);
        //console.log(user);
        /*for(var i in mock){
            // it might be _id here
            if(mock[i]._id == userId){
                mock[i].username = user.username;
                mock[i].firstName = user.firstName;
                mock[i].lastName = user.lastName;
                mock[i].password = user.password;
                console.log("updated user");
                //console.log(mock[i]);
                return mock[i];
            }*/
        var deferred = q.defer();
        userModel.update(
            {_id: userId},
            {$set: user},
            function (err, doc) {
                if(err){
                    deferred.reject(err);
                }else {
                    userModel.findById(userId, function (err, doc) {
                        if(err){
                            deferred.reject(err);
                        }else{
                            console.log(doc);
                            deferred.resolve(doc);
                        }
                    });
                }
                
            });
        return deferred.promise;
    }







    function deleteUser (userId){
        console.log("deleting user");
        console.log(userId)
        /*for(var i in mock){
            if(mock[i]._id == userId){
                mock.splice(i, 1);
                return mock;
            }
        }*/
        var deferred = q.defer();
        userModel.remove(
            {_id: userId},
            function (err, doc) {
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(findAllUser());
                }
            });
        return deferred.promise;

    }

    function findUserByUsername(username){
        /*for(var i in mock){
            if(mock[i].username === username){
                return mock[i];
            }
        }
        // if user is not found
        console.log("no user by this username");
        return null;*/
        var deferred = q.defer();
        userModel.findOne(
            {username: username},
            function (err, user) {
                if(err){
                    deferred.reject(err)
                }else{
                    deferred.resolve(user)
                }
            });
        return deferred.promise;
    }

    // updated for db querry
    function findUserByCredentials(credentials) {
        //old way
        /*for (var u in mock){
            if( mock[u].username === credentials.username &&
                mock[u].password === credentials.password){
                console.log(mock[u]);
                return mock[u];
            }
        }
        // if no user is found;
        console.log("no user found by credentials");
        return null;*/


        // console.log("credentials :");
        // console.log(credentials);

        var deferred = q.defer();

        // find one retrieves one document
        userModel.findOne(
            // firse argument is predicate
            {username: credentials.username,
             password: credentials.password},
            // doc is unique instance that matches predicate
            function (err, doc) {

                if(err){
                    //reject promise if error
                    deferred.reject(err);
                }else{
                    // resolve promise
                    console.log("found user: ");
                    //console.log(doc);
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;
    }



};