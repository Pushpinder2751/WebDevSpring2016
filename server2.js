var express = require('express');
var app = express();


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cs5610');


console.log(mongoose);

var CourseSchema = mongoose.Schema({
    title: String,
    seats: {type: Number, default: 25},
    starts: {type: Date, default: Date.now}
}, {collection: "course"});

// take the name of the model and make a collection
// suitable to provide schema above
var Course = mongoose.model("Course", CourseSchema);

Course.create({title: "Mongodb", seats: 32},
function (err, results) {
    console.log(err);
    console.log(results);
});

app.get('/rest/course', function (req, res) {
    res.send('hello world');
});

app.listen(3000);