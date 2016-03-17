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
        findAllFormsForUser: findAllFormsForUser

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

};