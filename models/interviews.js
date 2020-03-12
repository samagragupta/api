const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;
const InterviewSchema = new Schema({
    interviewee: {
        type: String,
        trim: true,
        required: true
    },
    startTime: {
        type: Number,
        required: true
    },
    endTime: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Interview', InterviewSchema);