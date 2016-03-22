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
                    controllerAs:"model"
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
                    controllerAs:"model"
                })
                .when("/admin", {
                    templateUrl: "views/users/admin.view.html",
                    controller: "AdminController",
                    controllerAs:"model"
                })
                .when("/forms", {
                    templateUrl: "views/forms/forms.view.html",
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
                    controller: "FieldsController as model",
                    controllerAs:"model"
                })
                .otherwise({
                    redirectTo: "/home"
                });

        }]);
})();