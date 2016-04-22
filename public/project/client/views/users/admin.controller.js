"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController)

    function AdminController($scope, $location, $rootScope, UserService){
        console.log("Hello from AdminController");

        // no need for this, already taken care of at routing page
        /*if($rootScope.currentUser.roles.indexOf("admin") < 0 ){
         console.log("Not an Admin!");
         $location.url("/home");
         return;
         }*/
        var vm = this;

        // remove the comment after implementing these functions
        vm.remove = remove;
        vm.update = update;
        // vm.add = add;
        vm.select = select;

        function init() {
            UserService
                .findAllUsers()
                .then(function (response) {
                    console.log("got users");
                    console.log(response.data);
                    vm.users = response.data;
                });
        }init();

        function remove(user) {
            console.log("user to delete"+user.username);

            UserService
                .deleteUserById(user._id)
                .then(function (response) {
                    console.log("got remaining users");
                    console.log(response.data);
                    vm.users = response.data;
                })

        }

        function select(user) {
            console.log("user to select "+user.username);
            var sUser = {};
            sUser.username = user.username;
            sUser.password = user.password;
            sUser.roles = user.roles;
            sUser._id = user._id;
            sUser.firstName = user.firstName;
            sUser.lastName = user.lastName;
            vm.selectedUser = sUser;


        }

        function update(user) {
            console.log("update User "+user.username);


            UserService
                .updateUser(user._id, user)
                .then(function (response) {
                    console.log("got update");
                    // this needs to be updated
                    //vm.users = response.data;
                    init();
                });
            vm.selectedUser = null;
        }

    }
})();
