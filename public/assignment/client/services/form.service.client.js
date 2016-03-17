"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService(){
        var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234}
        ];

        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            checkExistingForm: checkExistingForm
        };

        return api;

        function createFormForUser(userId, form, callback){
            var _id = (new Date).getTime();

            var newForm = {
                "_id" : _id,
                "title": form.title,
                "userId": userId
            };

            forms.push(newForm);
            callback(newForm);
        }

        function findAllFormsForUser(userId, callback){
            var formsById = [];
            for(var i = 0; i < forms.length; i++){
                if(forms[i].userId === userId){
                    formsById.push(forms[i]);
                }
            }
            callback(formsById);
        }

        function deleteFormById(formId, callback){

            for(var i = 0; i < forms.length; i++){
                if(forms[i]._id === formId){
                    forms.splice(i, 1);
                }
            }

            callback(forms);
        }

        function updateFormById(formId, newForm, callback){

            for(var i = 0; i< forms.length; i++){
                if(forms[i]._id === formId){
                    console.log("index no."+i);
                    forms[i] = {
                        "_id": newForm._id,
                        "title": newForm.title,
                        "userId": newForm.userId

                    }

                    callback(forms[i]);
                }
            }
        }

        function checkExistingForm(userId, form1){

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
        }



    }
})();