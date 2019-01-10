module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    // Create a new User
    app.put('/user', users.create);

    //Retrieve all users
    app.get('/user', users.findAll);

    // Retrieve a single User with email
    app.get('/user/:email', users.findByEmail);
    
    // Update a User with email
    app.put('/user/:email', users.updateByEmail);

    // Delete a User with email
    app.delete('/user/:email', users.delete);

    //login
    app.post('/user', users.login);
    
};