module.exports = (app) => {
    const groupUser = require('../controllers/groupUser.controller.js');

    
    // add new student/instructor to group (body:{email, token, role})
    app.put('/groupUser', groupUser.addUser);
    
    //get all
    app.get('/groupUser/', groupUser.getAll);
    
    // email: retrive all groups of the user
    // token: retrive all users of a group
    app.get('/groupUser/:filter', groupUser.getByFilter);

    // Delete a groupUser (body:{email, token})
    app.delete('/groupUser/', groupUser.delete);
 
    // Update a groupUser (body:{email, token, role}) //cambio de rol principalmente
    app.put('/groupUser/update', groupUser.update);
    
    //get a list of students from group by token
    //app.get('/groupUser/students/:token', groupUser.getAll);
}