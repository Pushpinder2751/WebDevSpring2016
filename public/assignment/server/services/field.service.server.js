module.exports = function (app, formModel) {
    app.get("/api/assignment/form/:formId/field", getFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldForForm);
    // why do I need to use guid or node-uuid libraries?
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);

    app.get("/api/assignment/form/:formId", getMyForm);

    function getFieldsForForm(req, res) {
         // req.formId vs req.params.formId?
        var formId = req.params.formId;
        var fields = [];
        fields = formModel.getFieldsForForm(formId);
        res.json(fields);
    }

    function getFieldForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(formModel.getFieldForForm(formId, fieldId));
    }

    function deleteFieldForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        //console.log(" fieldId in service :")
        // assignment does not ask to return the updated fields?
        // do we not need to update it in the client?
        res.json(formModel.deleteFieldForForm(formId, fieldId));
        // simply deleting the form for now.
        //formModel.deleteFieldForForm(formId, fieldId);
    }

    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        var newField = req.body;
        console.log("formId: "+formId);
        console.log("newField :"+newField);
        // should I do this is the model?
        // how and why use guid or uuid here when I can simply do this?
        newField._id = (new Date).getTime();

        res.json(formModel.createFieldForForm(formId, newField));
        //formModel.createFieldForForm(formId, newField);
    }

    function updateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var updatedField = req.body;
         

        res.json(formModel.updateField(formId, fieldId, updatedField));
    }

    function getMyForm(req, res){
        var form = formModel.findFormById(req.params.formId);
        res.send(form);
    }




};