module.exports = (app) => {
    const groups = require('../controllers/group.controller.js');

    // Create a new Group
    app.put('/group', groups.create);
    
    //Retrieve all groups
    app.get('/group', groups.findAll);

    // Delete a Group with token
    app.delete('/group/:token', groups.delete);
    
}