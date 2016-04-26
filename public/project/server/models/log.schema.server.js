module.exports = function (mongoose) {

    var LogSchema = mongoose.Schema({

        user: String,
        thing: String,
        status: String,
        update: Date
    }, {collection: 'project_log'});
    return LogSchema;
}

// the log message should say something like :
// 'user' turned 'thing' 'status' on 'update'