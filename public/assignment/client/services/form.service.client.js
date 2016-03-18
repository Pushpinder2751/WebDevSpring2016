"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http){

        // no more data in the client
        /*var forms = [
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
            return $http.post("/api/assignment/user/"+ userId+ "/form"+form);
        }

        function findAllFormsForUser(userId){
           return $http.get("/api/assignment/user/"+userId);
        }

        function deleteFormById(formId){
            return $http.delete("/api/assignment/form"+formId);
        }

        function updateFormById(formId, newForm){
            return $http.put("/api/assignment/form"+formId, newForm);
        }

        // might add later if needed
       /* function checkExistingForm(userId, form1){

            console.log("checkExistingfor.userId= "+userId);
            console.log(form1);

            var check_forms = forms.filter(function(form, index, arr){
                return (form.userId === userId && form.title === form1.title);
            });

            console.log("Check_forms ="+check_forms.length);
            if(check_forms.length == 0){
                console.log("no similar form exists");
                return 0
            }
            else{
                console.log("Form already exists!");
                alert("Form already exits");
                return 1;
            }
        }*/



    }
})();