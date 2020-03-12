const mongoose = require('mongoose');
const mongoDB = "mongodb+srv://admin:gBVKMgxpJa0IKm7t@cluster0-xu7bg.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
module.exports = mongoose;