const Score = require('../models/score.model.js');
const User = require('../models/user.model.js');
const Activity = require('../models/activity.model.js');

// Create a new score
exports.create = (req, res) => {
 if(!req.body.activityName || !req.body.email || !req.body.score){
    return res.status(400).send({
            message: "all fields must be filled and right"
        });
    }
    User.find({"email" : req.body.email}).then(user => {
        if(!user.length) {
            return res.status(500).send({
                message: "Error email " + req.body.email + " ERR: user dont exists"
            });
        }
        Activity.find({"name" : req.body.activityName}).then(activity => {
            if(!activity.length) {
                return res.status(500).send({
                    message: "Error activity " + req.body.activityName + " ERR: activity dont exists"
                });
            }
            Score.find({"activityName" : req.body.activityName, "email": req.body.email}).then(score => {
                if(score.length) {
                    return res.status(500).send({
                        message: "Error saving score for: " + req.body.activityName + " ERR: it already for:  " + req.body.email
                    });  
                }
                // Create a Score
                score = new Score({
                    activityName: req.body.activityName,
                    email: req.body.email, 
                    score: req.body.score,
                    status: "active"
                });
                // Save Score in the database
                score.save()
                .then(data => {
                res.send(data);
                })
            })
        });
    }).catch(err => {
        return res.status(500).send({
            message: "Error saving score with name " + req.params.activityName + " err: " + err
        });
    });
};

// Retrives all data
exports.findAll = (req, res) =>{
    Score.find()
    .then(score => {
        res.send(score);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving score."
        });
    });
};

// Retrives a single score by email and activityName
exports.findOne = (req, res) => {
    let email = req.body.email;
    let activityName = req.body.activityName;
    Score.find({"activityName" : activityName, "email" : email}).then(score => {
        if(!score.length) {
            return res.status(404).send({
                message: "Scores not found for email: " + email
            });            
        }
        res.send(score);
    }).catch(err => {
        return res.status(500).send({
            message: "Error retrieving Scores for email: " + email + " Err:" +err
        });
    });
};

// Retrives a list of scores by email or activityName
exports.findByFilter = (req, res) => {
    let emailRegex = /\S+@\S+\.\S+/;
    emailRegex.test(req.params.filter)?
        findByEmail(req.params.filter, res) :
        activityName(req.params.filter, res);
};

function findByEmail(email, res){
    Score.find({"email" : email}).then(score => {
    if(!score.length) {
        return res.status(404).send({
            message: "score not found with email " + email
        });            
    }
    res.send(score);
    }).catch(err => {
        return res.status(500).send({
            message: "Error retrieving score with email " + email + " Err:" +err
        });
    });
};

function activityName(activityName, res){
   Score.find({"activityName" : activityName}).then(score => {
    if(!score.length) {
        return res.status(404).send({
            message: "score not found with activityName " + activityName
        });            
    }
    res.send(score);
    }).catch(err => {
        return res.status(500).send({
            message: "Error retrieving score with activityName " + activityName + " Err:" +err
        });
    });
};

// Delete an score by email and activityName 
exports.delete = (req, res) => {
    Score.findOneAndUpdate({"activityName" : req.body.activityName, "email": req.body.email},
        {status: "inactive"},
         { returnNewDocument: true }
    ).then(score => {
        if(!score) {
            return res.status(404).send({
                message: "score not found with name " + req.body.name + "and activityName: " + req.body.activityName
            });
        }
        res.send(score);
    })
    .catch(err => {
        return res.status(500).send({
            message: "Error deleting score with name " + req.body.name + "and group activityName: " + req.body.activityName + " Err:" +err
        });
    });
};

// Update an score by email and activityName
exports.update = (req, res) => {
    Score.findOneAndUpdate({"activityName" : req.body.activityName, "email": req.body.email},
        {
            activityName: req.body.activityName,
            email: req.body.email, 
            score: req.body.score,
            status: req.body.status
        },
        { returnNewDocument: true }
    ).then(score => {
        if(!score) {
            return res.status(404).send({
                message: "score not found with email " + req.body.email + "and activityName: " + req.body.activityName
            });
        }
        res.send(score);
    })
    .catch(err => {
        return res.status(500).send({
            message: "Error deleting score with email " + req.body.email + "and activityName: " + req.body.activityName + " Err:" +err
        });
    });
};