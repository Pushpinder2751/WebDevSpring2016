var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var mongoose = require('mongoose');

// load passport module
var passport = require('passport');

// if it does not find the db, it creates one
var connectionString = 'mongodb://127.0.0.1:27017/cs5610';

// to use remote connection string
// if running remete server

/*
message in openshift
MongoDB 2.4 database added.  Please make note of these credentials:

    Root User:     admin
Root Password: ffGre8JL4H5k
Database Name: webdev2016

Connection URL: mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/*/
// where are these variables coming from!?
// Ans. When this server is at openshift, then it gets these variables from there.

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_NODEJS_HOST + ":" +
            process.env.OPENSHIFT_NODEJS_PORT + "/" +
            process.env.OPENSHIFT_APP_NAME;
}
// connect to the database  
mongoose.connect(connectionString);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("we are connected to the database!");
});



console.log("secret");
console.log(process.env.PASSPORT_SECRET);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

// what do I have to do in openshift for this??
// search setting environment  custom variables for openshift

app.use(cookieParser());
// do not know what it does, just used as instructed in api
app.use(session({
    secret: process.env.PASSPORT_SECRET,
    resave: true,
    saveUninitialized: true
}));

// initialize passport and session support
app.use(passport.initialize());
app.use(passport.session());


// where to fetch the static content
// __dirname = directory name
// '/public' from public direcory
//app.use('/scripts', express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/public'));


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.get('/hello', function(req, res){
    res.send('hello world');
});

// this is just an example
app.get('/api/users',function(req,res){
    var users = [
        {username: 'Pushpinder', first: 'Pushpinder', last: 'Singh'},
        {username: 'Mavez', first: 'Mavez', last: 'Singh'},
        {username: 'Rahul', first: 'Rahul', last: 'Bahal'},
        {username: 'Parth', first: 'Parth', last: 'Ahluwalia'}, // Correcting my last name! - Parth Ahluwalia
    ];
    res.json(users);
    //can also write res.send(users);
    // send automatically detects json
});

// passing the app to server side implementation to use express
// adding db and mongoose
require("./public/project/server/app.js")(app, db, mongoose);
require("./public/assignment/server/app.js")(app, db, mongoose);

app.listen(port, ipaddress);
app.listen(8080);
