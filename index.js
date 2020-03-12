const express = require('express');
const routes = require('./routes')
const bodyParser = require('body-parser');
const mongoose = require('./db'); //database configuration
const app = express();

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', function (req, res) {
    res.json({ "message": "API is working" });
});
app.use('/api', routes);

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// handle errors
app.use(function (err, req, res, next) {
    console.log(err);

    if (err.status === 404)
        res.status(404).json({ message: "Not found" });
    else
        res.status(500).json({ message: "Something looks wrong :( !!!" });
});
var server = app.listen(8001, function () {
    console.log('Node server listening on port 8000');
});
