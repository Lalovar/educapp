const express = require('express');
const bodyParser = require('body-parser');
// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

// create express app
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

// Connecting to the database
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
        }).then(() => {
            console.log("Successfully connected to the database");    
        }).catch(err => {
            console.log('Could not connect to the database. Exiting now...', err);
            process.exit();
        });

require('./app/routes/user.routes.js')(app);
require('./app/routes/group.routes.js')(app);
require('./app/routes/groupUser.routes.js')(app);
require('./app/routes/activity.routes.js')(app);
require('./app/routes/score.routes.js')(app);

// listen for requests
app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});