"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http){

        // no more data in the client
        /*var things = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234}
        ];*/

        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            checkExistingForm: checkExistingForm
        };

        return api;

        function createFormForUser(userId, form){
            return $http.post("/api/assignment/user/"+ userId+ "/form",form);
        }

        function findAllFormsForUser(userId){
           return $http.get("/api/assignment/form/user/"+userId+"/form");
        }

        function deleteFormById(formId){
            return $http.delete("/api/assignment/form/"+formId);
        }

        function updateFormById(formId, newForm){
            //console.log("HHHHHHH");
            //console.log(newForm);
            return $http.put("/api/assignment/form/"+formId, newForm);
        }

        // might add later if needed
        function checkExistingForm(userId, form){
            //console.log("form.title = "+form.title);
            return $http.get("/api/assignment/check/"+userId+"/"+form.title);
        }



    }
})();