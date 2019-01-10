module.exports = (app) => {
    const activity = require('../controllers/activity.controller.js');


//FALTA AGREGARLA AL SERVER.JS


    // Create a new Activity body:{name, type, groupToken, status, fromDate, toDate}
    //date format: YYYY-MM-DDTHH:MM:SS.
    app.put('/activity/', activity.create);

    //retrives all data []
    app.get('/activity/', activity.getAll);

    // Retrives a list of activities for token(all per group)
    app.get('/activity/:token', activity.findByGroup);

    // Delete an activity by name 
    app.delete('/activity/', activity.delete);
    
    // Update an activity by name
    app.put('/activity/update', activity.updateByName);
    
};