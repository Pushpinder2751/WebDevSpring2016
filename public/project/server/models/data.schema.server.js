module.exports = function (mongoose) {

    var DataSchema = mongoose.Schema({
        //_id
        thing: String,
        value: [Number],
        time: [Date]
    });
}

// how to I store data, with time? key-value pair?
// or separate time string?

// how about? time-start, time-end?
// so something like a session?