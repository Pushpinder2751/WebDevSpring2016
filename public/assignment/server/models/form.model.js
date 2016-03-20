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

        checkExistingForm: checkExistingForm,

        // functions for field.service.server.js
        findFormField: findFormField,
        findFieldById: findFieldById,
        deleteFieldById: deleteFieldById,
        createField: createField,
        updateFieldById: updateFieldById

    };
    return api;

    // Create of CRUD
    function createForm (userId, form) {
        console.log("create form title : "+form.title);
        var newForm = {
            _id: (new Date).getTime(),
            // keeping it simple for now, I don't know
            // if i need to add things such as title, userid, fields
            title: form.title,
            userId: userId

        };
        console.log(newForm);
        mock.push(newForm);
        return mock;
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
        console.log("update formId: "+formId);
        console.log("update form: "+newForm );
        for(var i in mock){
            // might have to update this
            if(mock[i]._id == formId){
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

    function findAllFormsForUser(userId){
        var userForms = [];
        for( var i in mock){
            if(mock[i].userId == userId){
                userForms.push(mock[i])
            }
        }
        //console.log(userForms);
        return userForms;
    }

    // function for fields of form
         /*for(i in mock){
            console.log("mock : "+mock[i].title);
            console.log("mock.id: "+mock[i].userId);
        }*/

    function getFieldsForForm(formId) {
        var fields = [];
        for (var i in mock){
            if(mock[i]._id === formId){
                fields = mock[i].fields;
                return fields;
            }
        }

    }

    function getFieldForForm(formId, fieldId) {
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

    function deleteFieldForForm(formId, fieldId) {
        var form = findFormById(formId);
        for( var i in form){
            if(form.fields[i]._id === fieldId){
                // might need to update this
                form.fields.splice(i, 1);
                return;
            }
        }
    }

    function createFieldForForm(formId, newField) {
        var form = findFormById(formId);
        newField._id = (new Date).getTime();
        form.fields.push(newField);

        // do I need to return this or not!?
    }

    function updateField(formId, fieldId, updatedField) {
        var form = findFormById(formId);
        for(var i in form.fields){
            if(form.fields[i]._id === formId){
                form.fields[i] = updatedField;
                // does this need to return something!?
                return;
            }
        }
    }

    function checkExistingForm(userId, form1){
        //console.log("check");
        //console.log("checkExistingfor.userId= "+userId);
        //console.log("check existint form1 title "+form1);
        /*for(i in mock){
            console.log("mock : "+mock[i].title);
            console.log("mock.id: "+mock[i].userId);
        }*/
        console.log("form1 "+form1);
        console.log("userid: "+userId);
        var check_forms = mock.filter(function(form, index, arr){
            return (form.userId == userId && form.title == form1);
        });

        //console.log("Check_forms ="+check_forms.length);
        if(check_forms.length == 0){
            console.log("no similar form exists");
            //console.log(userId);
            //var x = 0;
            return "0";
        }
        else{
            console.log("Form already exists!");
            return "1";
        }
    }
};