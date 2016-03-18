var mock = require("./form.mock.json");

module.exports = function(app) {

    var api = {
        //generic model requirements
        createForm: createForm,
        findAllForms: findAllForms,
        findFormById: findFormById,
        updateFormById: updateFormById,
        deleteFormById: deleteFormById,

        // form model specific requirements
        findFormByTitle: findFormByTitle,

        // extra needed
        findAllFormsForUser: findAllFormsForUser,

        // functions for field.service.server.js
        findFormField: findFormField,
        findFieldById: findFieldById,
        deleteFieldByid: deleteFieldByid,
        createField: createField,
        updateFieldById: updateFieldById

    };
    return api;

    // Create of CRUD
    function createForm (userId, form) {
        var newForm = {
            _id: (new Date).getTime(),
            // keeping it simple for now, I don't know
            // if i need to add things such as title, userid, fields
            title: form.title,
            userId: userId

        };

        forms.push(newForm);
        return forms;
    }

    function findAllForms () {
        if (forms) {
            return forms;
        }
    }

    function findFormById (formId) {
        fomrId = parseInt(fomrId);
        for(var i in mock){
            if(mock[i].id === formId){
                return mock[i];
            }
        }
        // if no form is found
        console.log("No form by this formId!");
        return null;
    }

    // Update of CRUD
    function updateFormById (formId, newForm) {
        formId = parseInt(formId);
        for(var i in mock){
            // might have to update this
            if(mock[i]._id === formId){
                mock[i].title = newForm.title;
                mock[i].userId = newForm.userId;
                return mock[i];
            }
        }
        return null;

    }

    function deleteFormById (formId) {
        formId = parseInt(formId);
        for(var i in mock){
            if(mock[i]._id == formId){
                mock.splice(i, 1);
                return mock;
            }
        }
        return mock;
    }

    function findFormByTitle(title){
        for(var i in mock){
            if(mock[i].title === title){
                return mock[i];
            }
        }
        // if form is not found
        console.log("no form by this title");
        return null;
    }

    function findAllFormsByUser(userId){
        var userForms = [];
        for( var i in mock){
            if(mock[i].userId === userId){
                userForms.push(mock[i])
            }
        }
        return userForms;
    }

    // function for fields of form
    function findFormField(formId) {
        var fields = [];
        for (var i in mock){
            if(mock[i]._id === formId){
                fields = mock[i].fields;
                return fields;
            }
        }

    }

    function findFieldById(formId, fieldId) {
        var field;
        var form = findFormById(formId);

        for(var i in form.fields){
            if(form.fields[i] === fieldId){
                field = form.fields[i];
                return field;
                // do I need to break here? return ends the program is'nt it?
            }
        }

        // field not present in form
        console.log("field not present in this form");
        return null;
    }

    function deleteFieldById(formId, fieldId) {
        var form = findFormById(formId);
        for( var i in form){
            if(form.fields[i]._id === fieldId){
                // might need to update this
                form.fields.splice(i, 1);
                return;
            }
        }
    }

    function createField(formId, newField) {
        var form = findFormById(formId);
        newField._id = (new Date).getTime();
        form.fields.push(newField);

        // do I need to return this or not!?
    }

    function updateFieldById(formId, fieldId, updatedField) {
        var form = findFormById(formId);
        for(var i in form.fields){
            if(form.fields[i]._id === formId){
                form.fields[i] = updatedField;
                // does this need to return something!?
                return;
            }
        }
    }
};