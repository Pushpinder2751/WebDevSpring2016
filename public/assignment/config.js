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
                    controller: "HeaderController"
                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController"
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController"
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController"
                })
                .when("/admin", {
                    templateUrl: "views/users/admin.view.html",
                    controller: "MainController"
                })
                .when("/forms", {
                    templateUrl: "views/forms/forms.view.html",
                    controller: "FormController"
                })
                .when("/fields",{
                    templateUrl: "views/fields/form-fields.view.html",
                    controller: "FieldsController"
                })
                .otherwise({
                    redirectTo: "/home"
                });

        }]);
})();