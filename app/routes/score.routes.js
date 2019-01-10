module.exports = (app) => {
    const score = require('../controllers/score.controller.js');


//FALTA AGREGARLA AL SERVER.JS


    // Create a new score
    app.put('/score', score.create);

    // Find all scores
     app.get('/score/all', score.findAll);

    // Retrives a single score by {email, activityName } as body param
    app.get('/score', score.findOne);
    
    // Retrives a list of scores by email or activityName
    app.get('/score/:filter', score.findByFilter);

    // Delete an score by email and activityName 
    app.delete('/score/', score.delete);
    
    // Update an score by email and activityName
    app.put('/score/update', score.update);
    
};