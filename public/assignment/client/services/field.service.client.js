"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http) {
        var api = {
            createFieldForForm: createFieldForForm,
            // plural
            getFieldsForForm: getFieldsForForm,
            // singular
            getFieldForForm: getFieldForForm,
            deleteFieldForForm: deleteFieldForForm,
            updateField: updateField,

            // implement more if necessary
            getMyForm: getMyForm


        };

        return api;

        // "cleverly" same name to the functions as api

        function createFieldForForm(formId, field) {
            return $http.post("/api/assignment/form"+formId+"/field", field);
        }

        // the plural
        function getFieldsForForm(formId) {
            return $http.get("/api/assignment/form/"+formId+"/field");
        }

        // singular
        // this is to get field from id is equal to the fieldId and belonging
        // to a form object whise id is equal to the formId
        function getFieldForForm(formId, fieldId) {
            return $http.get("/api/assignment/form/"+formId+"/field/"+fieldId );
        }
        
        function deleteFieldForForm(formId, fieldId) {
            return $http.delete("/api/assignment/form/"+formId+"/field/"+fieldId);
        }
        
        function updateField(formId, fieldId) {

            return $http.put("/api/assignment/form/"+formId+"/field/"+fieldId, field);
        }

        function getMyForm(formId){
            return $http.get("/api/assignment/form/"+ formId);
        }


    }



})();