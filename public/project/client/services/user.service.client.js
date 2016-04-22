/**
 * Created by pushy on 2/22/16.
 */

(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope){


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
            console.log("logging out!");
            return $http.post("/api/project/logout");
        }

        function getCurrentUser() {
            // old implementation
            //return $rootScope.currentUser;
            // new implementation
            return $http.get("/api/project/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
            console.log("Set current user done!");
            // console.log($rootScope.currentUser);
        }

        function findUserByUsername(username) {
            // not sure if this is the right way
            return $http.get("/api/project/user?username"+ username);
        }

        function deleteUserById(userId){
            //console.log("delete User by Id");
            return $http.delete("/api/project/user/"+ userId);
        }

        // I am not sure if this is right

        function findAllUsers(){
            return $http.get("/api/project/user");
        }

        function createUser(user){
            return $http.post("/api/project/user", user);
        }

        function updateUser(userId,user){
            console.log("update User");
            return $http.put("/api/project/user/"+userId, user);
        }

        // removing callback to use $http to retrieve user from server, eventually db
        function findUserByCredentials(username, password){
            // might need to fix this
            // do I need get or post request here?
            var user={};
            user.username = username;
            user.password = password;
            return $http.post("/api/project/login", user);

            
        }



    }
})();