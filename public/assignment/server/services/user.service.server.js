
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// to encrypt password
var bcrypt = require("bcrypt-nodejs");


module.exports = function(app, userModel){

    var auth = authorized;
    // generic web service requirement first
    // this pipelining is very important as req.user is not created otherwise and 
    // user authentication fails. 
    app.post("/api/assignment/user",  createUser);
    // the get request does not conflict with the post request
    app.get("/api/assignment/user", auth, reroute);
    app.get("/api/assignment/user/:userId", findUserById);
    app.put("/api/assignment/user/:userId", updateUser);
    app.delete("/api/assignment/user/:userId", deleteUser);

    // for security

    app.post("/api/assignment/login", passport.authenticate('local'), login);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function localStrategy(username, password, done) {

        // console.log("username : "+username);
        // console.log("password: "+password);

        /*var user = userModel.findUserByCredentials({username: username, password: password})
            .then(
                function (user) {
                    if(!user){
                        // 1st argument, is to return error
                        return done(null, false);
                    }
                    //req.session.currentUser = user;
                    console.log("sending back user: ");
                   // console.log(user);
                    delete user.password;
                    return done(null, user);
                },
                function (err) {
                    if(err) {
                        return done(err);
                    }
                }
            )*/

        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    console.log("user is :");
                    console.log(user);
                    console.log(password);
                    // if the user exists, compare passwords with bcrypt.campareSync
                    if(user && bcrypt.compareSync(password, user.password)){
                        console.log("passwords match!");
                        return done(null, user);
                    }else{
                        console.log("could not login!");
                        return done(null, false);
                    }
                }
            );


    }

    // will add the logged in user to session and cookie
    // will come here only after authentication
    function login(req, res) {
        console.log("in login");
        console.log(req.user);
        var user = req.user;
        delete user.password;
        res.json(user);
    }

    //user service specific requirements
    // might need to update this
    // api/assignment/user?username=username
    // this is what is asked in the assignment, so not sure
    //app.get("/api/assignment/user/:username", findUserByUsername);
    // GET /api/assignment/user?username=alice&password=wonderland
    // do I use "?"
    //app.get("/api/assignment/user?username=username&password=password", findUserByCredentials);

    // when response goes back to the client
    function serializeUser(user, done) {
        delete user.password;
        done(null, user);
    }

    function deserializeUser(user, done) {
        var user = userModel.findUserById(user._id)
            .then(
                //return user if promise if resolved
                function (user) {
                    // this does not delete anything!
                    delete user.password;
                    console.log("deserialize user");
                    //console.log(user);
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }


//"cleverly" named same as the model function names

    function logout(req, res) {
        // using passport function logOut
        req.logOut();
        // no need for session.destroy, logOut() does this for us
        // req.session.destroy();
        res.send(200);
    }

    // to be used later , remove the comment when you start using this.
    function loggedin(req, res) {
        console.log("in Logged in function");
        console.log(req.user);
        console.log(req.session.currentUser);
        // trying something, I don't know the side affects of it yet.
        //req.user = req.session.currentUser;
        /*res.json(req.session.currentUser);*/

        res.send(req.isAuthenticated() ? req.user : '0');
    }
    


    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };


// post to Create new User
// updated for databases
     function createUser (req, res, next){
         var newUser = req.body;
         console.log("in create user");
         console.log(newUser);

         // this is to check if admin is providing the roles manually.
         if(newUser.roles && newUser.roles.length > 1) {
             newUser.roles = newUser.roles.split(",");
         } else {
             newUser.roles = ["student"];
         }

         // first check if the user already exists with the same username;
         console.log("I am here");
         userModel.findUserByUsername(newUser.username)
             .then(function (doc) {
                     console.log("return from find user by username");
                     if(doc == null){
                         console.log("no user with this username exists");
                         // is there a better design for putting user in session ?
                        // encrypt the password with one way hash
                         newUser.password = bcrypt.hashSync(newUser.password);
                         newUser = userModel.createUser(newUser)
                             // handle model promise
                             .then(
                                 // login user if promise resolved
                                 function (doc) {
                                     /*    req.session.currentUser = doc;
                                     // this does not work;
                                     //req.user = doc;
                                     console.log("sending back new user data");
                                     console.log(doc)
                                     next();*/
                                     // if you do not want to do the above implementation 
                                     // alternate passport function
                                     if(doc){
                                         req.login(doc, function (err) {
                                             if(err){
                                                 res.status(400).send(err);
                                             }else{
                                                 res.json(doc);
                                             }

                                         });
                                     }

                                     
                                 },
                                 // send error if promise rejected
                                 function (err) {
                                     res.status(400).send(err);
                                 }
                             );
                     }else{
                         console.log("User with this userName already exists!");
                         // interpret this at controller
                         res.json(null);
                     }

                 },
                 function (err) {
                     res.status(400).send(err);
                 });


         


     }


    function reroute(req, res) {
        console.log(req.query.username);
        console.log(req.query.password);
        console.log("entered reroute");
        if(req.query.username && req.query.password){
            console.log("finding user by credentials");
            findUserByCredentials(req, res);
        }
        else if(req.query.username){
            findAllUser(req, res);
        }
        else if (req.params.userId) {
            updateUser(req, res);
        }
        else {
            findAllUser(req, res);
        }

    }
// to find/return all users
// updated with promise for db.
    function findAllUser (req, res){
        //console.log(req.query.username);
        console.log("user : ");
        console.log(req.user);
        if(isAdmin(req.user)){
            console.log("isAdmin");
            var users = userModel.findAllUser()
                .then(
                    //return users if promise if resolved
                    function (doc) {
                        // might need to return doc here
                        console.log("Sending back all users :");
                        //console.log(doc);
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        }
        else{
            console.log("not an Admin");
            res.status(403);
        }

    }

    function isAdmin(user) {
        if(user.roles.indexOf("admin") > -1){
            return true;
        }
        return false;
    }

//FindUserById: takes an Id and returns corresponding user

    function findUserById(req, res){
        var userId = req.params.userId;
        //console.log(userId);
        //res.json(userModel.findUserById(userId))
        var user = userModel.findUserById(userId)
            .then(
                //return user if promise if resolved
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

// to Update the user
// updated with db
    function updateUser (req, res){
        var userId = req.params.userId;
        // how does this work?
        var user = req.body;

        if(user.roles && user.roles.length > 1) {
            user.roles = user.roles.split(",");
        } else {
            user.roles = ["student"];
        }
        //console.log("update");
        //console.log(user);
        //res.json(userModel.updateUser(userId, user));
        var updatedUser = userModel.updateUser(userId, user)
            .then(
                function (doc) {
                    //console.log("sending updated user");
                    //console.log(doc);
                    req.session.currentUser = doc;
                    res.json(doc);

                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

// to Delete a user
// not tested
    function deleteUser (req, res){
        var userId = req.params.userId;
        //res.json(userModel.deleteUser(userId));
        userModel.deleteUser(userId)
            .then(
                function (doc) {
                    // returns all users
                    console.log(doc);
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }


    // findUserByUserName
    // not tested
    function findUserByUsername(req, res){
        var username = req.params.username;
        //res.json(userModel.findUserByUsername(username));
        userModel.findUserByUsername(username)
            .then(function (doc) {
                console.log("found user");
                console.log(doc);
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            })
    }

// updated with promise for db. 
    function findUserByCredentials(req, res){
        //console.log("user.service.server : I reached server");
        var credentials = {
            username: req.query.username,
            password: req.query.password
        };
        //console.log("credentials "+credentials);
        var user = userModel.findUserByCredentials(credentials)
            .then(
                function (doc) {
                    req.session.currentUser = doc;
                    console.log("sending back user: ");
                   // console.log(doc);
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
        
    }






};

