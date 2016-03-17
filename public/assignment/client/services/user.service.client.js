/**
 * Created by pushy on 2/22/16.
 */

(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService(){
        var current_users = [];
        var current_users = [
            {        "_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]                },
            {        "_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]                },
            {        "_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]                },
            {        "_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {        "_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]                }
        ];
        // exposing the functions to the app
        var api = {
            findUserByCredentials: findUserByCredentials,
            createUser: createUser,
            updateUser: updateUser,
            findAllUsers: findAllUsers,
            deleteUserById:deleteUserById
        }
        return api;

        function deleteUserById(userId,callback){
            console.log("delete User by Id");
            for(i = 0; i < current_users.length; i++){
                if(userId == current_users[i]._id){
                    // removing an item from an array.
                    // find other ways to do it.
                    current_users.splice(i,1);
                }
            }
            callback(current_users);
        }

        // I am not sure if this is right

        function findAllUsers(callback){
            callback(current_users);
        }

        function createUser(user,callback){
            var id =(new Date).getTime();
            var newUser = {
                "_id":id,
                "firstName":  "",
                "lastName":"",
                "username": user.username,
                "password": user.password,
                "roles": []
            };

            current_users.push(newUser);
            callback(newUser);
        }

        function updateUser(userId,user,callback){
            console.log("update User");
            for(i = 0; i < current_users.length; i++){
                if( (current_users[i]._id) == userId){
                    current_users[i].firstName = user.firstName;
                    current_users[i].lastName = user.lastName;
                    current_users[i].username = user.username;
                    current_users[i].password = user.password;
                }
            }
            callback(user);
        }

        function findUserByCredentials(username, password, callback){
            // noUser flag
            var noUser = 0;

            for(i = 0; i < current_users.length; i++){

                if ( (current_users[i].username == username) && (current_users[i].password == password)){
                    callback(current_users[i]);
                    noUser++;
                }
            }
            //console.log(noUser);
            if(!noUser){

                    console.log("user not found!");
                    callback(null);
            }
        }
        function callback(user){
            return user;
        }



    }
})();