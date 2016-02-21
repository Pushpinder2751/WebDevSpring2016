/**
 * Created by pushy on 2/18/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "views/home/home.view.html",
                    controller: "MainController"
                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: "MainController"
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller: "MainController"
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "SidebarController"
                })
                .when("/admin", {
                    templateUrl: "views/users/admin.view.html",
                    controller: "MainController"
                })
                .otherwise({
                    redirectTo: "/"
                });

        }]);
})();