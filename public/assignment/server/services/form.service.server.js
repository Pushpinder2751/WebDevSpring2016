module.exports = function(app, userModel, formModel){
    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    // How to use guid or node-uuid libraries here and why?
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateFormById);

    function findAllFormsForUser(req, res){
        // not sure if params is to be used here
        var userId = req.params.userId;
        res.json(formModel.findAllFormsForUser(userId));

    }

    function findFormById(req , res){
        var formId = req.params.formId;
        res.json(formModel.findFormById(formId));
    }

    function deleteFormById(req, res){
        var formId = req.params.formId;
        res.json(formMode.deleteFormById(formId));
    }

    function createForm(req, res){
        var userId = req.params.userId;
        var form = req.body;
        res.json(formModel.createForm(userId, form));
    }

    function updateFormById(req, res){
        var formId = req.params.formId;
        var newForm = req.body;
        res.json(formModel.updateFormById(formId, newForm));
    }
}
