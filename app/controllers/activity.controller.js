const Activity = require('../models/activity.model.js');
const Group = require('../models/group.model.js');

// Create and Save a new Activity
exports.create = (req, res) => {
    if(!req.body.name || !req.body.type || !req.body.groupToken || !req.body.status
    || !req.body.fromDate || !req.body.fromDate){
    return res.status(400).send({
            message: "all fields must be filled and right"
        });
    }
    
    Group.find({"token" : req.body.groupToken}).then(group => {
        if(!group.length) {
            return res.status(500).send({
                message: "Error " + req.body.groupToken + " ERR: group dont exists"
            });
        }
     });
    
    Activity.find({"name" : req.body.name, "groupToken": req.body.groupToken}).then(activity => {
        if(activity.length) {
            return res.status(500).send({
                message: "Error saving Activity with name " + req.body.name + " ERR: it already exists in group " + req.body.groupToken
            });  
        }
        // Create a GroupUser
        activity = new Activity({
            name: req.body.name,
            type: req.body.type,
            content: req.body.content,
            groupToken: req.body.groupToken, 
            status: req.body.status,    
            fromDate: new Date(req.body.fromDate),
            toDate: new Date(req.body.toDate)
        });
        // Save GroupUser in the database
        activity.save()
            .then(data => {
            res.send(data);
        })
    }).catch(err => {
        return res.status(500).send({
            message: "Error saving activity with name " + req.params.name + " err: " + err
        });
    });
};

//retrives all data []
exports.getAll = (req, res) => {
    Activity.find()
    .then(activity => {
        res.send(activity);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving activity."
        });
    });
}

// Retrives a list of activities by token(all per group)
exports.findByGroup = (req, res) => {
    let token = req.params.token;
    Group.find({"token" : token}).then(group => {
        if(!group.length) {
            return res.status(500).send({
                message: "Error " + token + " ERR: group dont exists"
            });
        }
         Activity.find({"groupToken" : token}).then(activity => {
            if(!activity.length) {
                return res.status(404).send({
                    message: "activities not found for group: " + token
                });            
            }
        res.send(activity);
        }).catch(err => {
            return res.status(500).send({
                message: "Error retrieving activities for group: " + token + " Err:" +err
            });
        });
     });
    
   
};

exports.delete = (req, res) => {
    Activity.findOneAndUpdate({"name" : req.body.name, "groupToken": req.body.groupToken},
        {status: "inactive"},
         { returnNewDocument: true }
    ).then(activity => {
        if(!activity) {
            return res.status(404).send({
                message: "activity not found with name " + req.body.name + "and group token: " + req.body.groupToken
            });
        }
        res.send(activity);
    })
    .catch(err => {
        return res.status(500).send({
            message: "Error deleting activity with name " + req.body.name + "and group token: " + req.body.groupToken + " Err:" +err
        });
    });
}    

exports.updateByName = (req, res) => {
    Activity.findOneAndUpdate({"email" : req.body.email, "token": req.body.token},
        {name: req.body.name,
            type: req.body.type,
            content: req.body.content,
            groupToken: req.body.groupToken, 
            status: req.body.status,    
            fromDate: new Date(req.body.fromDate),
            toDate: new Date(req.body.toDate)
        },
        { returnNewDocument: true }
    ).then(activity => {
        if(!activity) {
            return res.status(404).send({
                message: "activity not found with name " + req.body.name + "and group token: " + req.body.groupToken
            });
        }
        res.send(activity);
    })
    .catch(err => {
        return res.status(500).send({
            message: "Error deleting activity with name " + req.body.name + "and group token: " + req.body.groupToken + " Err:" +err
        });
    });
};