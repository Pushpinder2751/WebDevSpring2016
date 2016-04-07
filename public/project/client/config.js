/**
 * Created by pushy on 2/18/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider
            // I dont know if I need this. Check with Jose.
                //.when("/", {
                //    templateUrl: "views/home/home.view.html",
                //    controller: "MainController"
                //})
                .when("/home",{
                    templateUrl: "views/home/home.view.html",
                    controller: "HeaderController",
                    controllerAs:"model",
                    resolve: {
                        // this is if I want to display some specific info.
                        // for that particular user when logged in. 
                        getLoggedIn: getLoggedIn
                    }
                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController",
                    controllerAs:"model"
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController",
                    controllerAs:"model"
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController",
                    controllerAs:"model",
                    resolve: {
                        checkLoggedIn: checkLoggedIn
                    }
                })
                .when("/admin", {
                    templateUrl: "views/users/admin.view.html",
                    controller: "AdminController",
                    controllerAs:"model"
                })
                .when("/thing", {
                    templateUrl: "views/things/things.view.html",
                    controller: "FormController",
                    controllerAs:"model"
                })
                .when("/fields",{
                    templateUrl: "views/fields/form-fields.view.html",
                    controller: "FieldsController",
                    controllerAs:"model"
                })
                .when("/form/:formId/fields",{
                    templateUrl: "views/fields/form-fields.view.html",
                    controller: "FieldsController",
                    controllerAs:"model"
                })
                .when("/thingFields",{
                    templateUrl: "views/fields/thing-fields.html",
                    controller: "thingFieldsController",
                   // controllerAs: "model"
                })
                .otherwise({
                    redirectTo: "/home"
                });

        }]);

        function checkLoggedIn(UserService, $q, $location) {
            // don't know how this works yet
            var deferred = $q.defer();
        
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var currentUser = response.data;
                    if(currentUser){
                        UserService.setCurrentUser(currentUser)
                        deferred.resolve();
                    } else {
                        deferred.reject();
                        console.log("not logged IN!!");
                        // need to change the url to login page later
                        $location.url("/home");
                    }
                })

            return deferred.promise;
        }
    
        function getLoggedIn(UserService, $q) {
            var deferred = $q.defer();

            UserService
                .getCurrentUser()
                .then(function (response) {
                    if(response.data){
                        console.log("got user");
                        var currentUser = response.data;
                        UserService.setCurrentUser(currentUser);
                    }


                    deferred.resolve();
                });
        }
})();