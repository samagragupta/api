const userModel = require('./models/users');
const interviewModel = require('./models/interviews');

module.exports = {
    createUser: function (req, res, next) {
        userModel.create({ name: req.body.name, email: req.body.email }, function (err, r) {
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: "Error !!!"
                });
            }
            else {
                return res.json({
                    error: false,
                    message: "success",
                    data: r
                });
            }
        })
    },
    getUsers: function (req, res, next) {
        userModel.find({}).sort({ name: 1 }).exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: "Error !!!"
                });
            }
            else {
                return res.json({
                    error: false,
                    message: "success",
                    data: users
                });
            }
        })
    },
    createInterview: function (req, res, next) {
        var isAvail = true;
        interviewModel.find({ interviewee: req.body.interviewee }, (err, result) => {
            result.forEach(interview => {
                if ((interview.startTime <= req.body.startTime && interview.endTime >= req.body.startTime) || (interview.startTime <= req.body.endTime && interview.endTime >= req.body.endTime)) {
                    isAvail = false;
                }
            })

            if (isAvail) {
                interviewModel.create({ interviewee: req.body.interviewee, startTime: req.body.startTime, endTime: req.body.endTime }, function (err, r) {
                    if (err) {
                        return res.status(400).json({
                            error: true,
                            message: "Error !!!",
                            data: err
                        });
                    }
                    else {
                        return res.json({
                            error: false,
                            message: "Interview created successfully!!!",
                            data: r
                        });
                    }
                })
            } else {
                return res.status(400).json({
                    error: true,
                    message: "User has already scheduled interview b/w given time"
                });
            }
        })

    },
    getInterviews: function (req, res, next) {
        interviewModel.find({}).sort({ startTime: -1 }).exec((err, interviews) => {
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: "Error !!!"
                });
            }
            else {
                return res.json({
                    error: false,
                    message: "success",
                    data: interviews
                });
            }
        })
    },

    reScheduleInterview: function (req, res, next) {
        var isAvail = true;
        interviewModel.find({ interviewee: req.body.interviewee }, (err, result) => {
            result.forEach(interview => {
                if (interview._id != req.body.id) {
                    if ((interview.startTime <= req.body.startTime && interview.endTime >= req.body.startTime) || (interview.startTime <= req.body.endTime && interview.endTime >= req.body.endTime)) {
                        isAvail = false;
                    }
                }
            })

            if (isAvail) {
                interviewModel.findByIdAndUpdate(req.body.id, { $set: { startTime: req.body.startTime, endTime: req.body.endTime } }, { new: true }, function (err, r) {
                    if (err) {
                        return res.status(400).json({
                            error: true,
                            message: "Error !!!",
                            data: err
                        });
                    }
                    else {
                        return res.json({
                            error: false,
                            message: "Interview updated successfully!!!",
                            data: r
                        });
                    }
                })
            } else {
                return res.status(400).json({
                    error: true,
                    message: "User has already scheduled interview b/w given time"
                });
            }
        })
    }
}