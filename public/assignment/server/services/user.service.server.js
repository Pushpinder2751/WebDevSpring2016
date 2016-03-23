
module.exports = function(app, userModel){
    // generic web service requirement first
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", reroute);
    app.get("/api/assignment/user/:userId", findUserById);
    app.put("/api/assignment/user/:userId", updateUser);
    app.delete("/api/assignment/user/:userId", deleteUser);
    app.get("/api/assignment/user/loggedin", loggedin);

    //user service specific requirements
    // might need to update this
    // api/assignment/user?username=username
    // this is what is asked in the assignment, so not sure
    //app.get("/api/assignment/user/:username", findUserByUsername);
    // GET /api/assignment/user?username=alice&password=wonderland
    // do I user "?"
    //app.get("/api/assignment/user?username=username&password=password", findUserByCredentials);



//"cleverly" named same as the model function names


// post to Create new User
     function createUser (req, res){
        var newUser = req.body;
        console.log(newUser);
        // this is pretty cool
        res.json(userModel.createUser(newUser));
     }


    function reroute(req, res) {
        console.log(req.query.username);
        console.log(req.query.password);
        if(req.query.username && req.query.password){
            findUserByCredentials(req, res);
        }
        else if(req.query.username){
            findAllUser(req, res);
        }
        else {
            findAllUser(req, res);
        }

    }
// to find/return all users
    function findAllUser (req, res){
        console.log(req.query.username);
        res.json(userModel.findAllUser());
    }

//FindUserById: takes an Id and returns corresponding user

    function findUserById(req, res){
        var userId = req.params.userId;
        console.log(userId);
        res.json(userModel.findUserById(userId));
    }

// to Update the user
    function updateUser (req, res){
        var userId = req.param.userId;
        // how does this work?
        var user = req.body;
        res.json(userModel.updateUser(userId, user));
    }

// to Delete a user
    function deleteUser (req, res){
        var userId = req.params.userId;
        res.json(userModel.deleteUser(userId));
    }


    // findUserByUserName
    function findUserByUsername(req, res){
        var username = req.params.username;
        res.json(userModel.findUserByUsername(username));
    }


    function findUserByCredentials(req, res){
        //console.log("user.service.server : I reached server");
        var credentials = {
            username: req.query.username,
            password: req.query.password
        }
        //console.log("credentials "+credentials);
        var user = userModel.findUserByCredentials(credentials);
       // req.session.currentUser = user;

        res.json(user);
    }

    // to be used later , remove the comment when you start using this.
    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }




};

