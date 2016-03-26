/**
 * Created by pushy on 2/22/16.
 */

(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope){
        // asked by professor to remove this for assignment 3
        /*var current_users = [];
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
        ];*/


        // exposing the functions to the app
        var api = {
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            createUser: createUser,
            updateUser: updateUser,
            findAllUsers: findAllUsers,
            deleteUserById:deleteUserById,

            // new ones
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            logout: logout
        }
        return api;

        function logout() {
            return $http.post("/api/assignment/logout");
        }

        function getCurrentUser() {
            // old implementation
            //return $rootScope.currentUser;
            // new implementation
            return $http.get("/api/assignment/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
            console.log("current user :");
            console.log($rootScope.currentUser);
        }

        function findUserByUsername(username) {
            // not sure if this is the right way
            return $http.get("/api/assignment/user?username"+ username);
        }

        function deleteUserById(userId){
            //console.log("delete User by Id");
            return $http.delete("/api/assignment/user/"+ userId);
        }

        // I am not sure if this is right

        function findAllUsers(){
            return $http.get("/api/assignment/user");
        }

        function createUser(user){
           return $http.post("/api/assignment/user", user);
        }

        function updateUser(userId,user){
            //console.log("update User");
            return $http.put("/api/assignment/user/"+userId, user);
        }

        // removing callback to use $http to retrieve user from server, eventually db
        function findUserByCredentials(username, password){
            // might need to fix this
            return $http.get("/api/assignment/user?username="+username+"&password="+password);
        }



    }
})();