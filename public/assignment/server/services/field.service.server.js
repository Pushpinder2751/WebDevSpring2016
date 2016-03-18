module.exports = function (app, formModel) {
    app.get("/api/assignment/form/:formId/field", findFormField);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldById);
    app.delete("/api/assignment/form/formId/field/:fieldId", deleteFieldById);
    // why do I need to use guid or node-uuid libraries?
    app.post("/api/assignment/form/:formId/field", createField);
    app.put("/api/assignment/form/:formId/:fieldId", updateFieldById);

    function findFormField(req, res) {
         // req.formId vs req.params.formId?
        var formId = req.params.formId;
        var fields = [];
        fields = formModel.findFormField(formId);
        res.json(fields);
    }

    function findFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(formModel.findFieldById(formId, fieldId));
    }

    function deleteFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.feildId;
        // assignment does not ask to return the updated fields?
        // do we not need to update it in the client?
        //res.json(formModel.deleteFieldById(formId, fieldId));
        // simply deleting the form for now.
        formModel.deleteFieldById(formId, fieldId);
    }

    function createField(req, res) {
        var formId = req.params.formId;
        var newField = req.body;
        // should I do this is the model?
        // how and why use guid or uuid here when I can simply do this?
        newField._id = (new Date).getTime();
        // assignment asks nothing to return? Does it not need to update in the view?
        //res.json(formModel.createField(formId, field));
        formModel.createField(formId, newField);
    }

    function updateFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var updatedField = req.body;
        // do I return nothing from here? 
        //res.json(formModel.updateFieldById(formId, fieldId, updatedField));
        formModel.updateFieldById(formId, fieldId, updatedField);
    }




};