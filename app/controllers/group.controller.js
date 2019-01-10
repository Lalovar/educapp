const Group = require('../models/group.model.js');
const User = require('../models/user.model.js');

// Create and Save a new Group
exports.create = (req, res) => {
    // Validate request
    if(!req.body.token) return res.status(400).send({
            message: "token content can not be empty"
        });
    if(!req.body.name) return res.status(400).send({
            message: "name content can not be empty"
        });
    if(!req.body.instructor) return res.status(400).send({
            message: "instructor content can not be empty"
        });
        
    User.find({"email" : req.body.instructor}).then(user => {
        if(!user.length) {
            return res.status(500).send({
                message: "Error " + req.body.instructor + " ERR: dont exists"
            });
        }
        if(user[0].type == "teacher"){
            Group.find({"token" : req.body.token}).then(group => {
                    if(group.length) {
                        return res.status(500).send({
                            message: "Error saving Group with token " + req.body.token + " ERR: it already exists"
                        });  
                    }
                    // Create a Group
                group = new Group({
                    token: req.body.token,
                    name: req.body.name, 
                    instructor: [
                        {0: req.body.instructor}
                    ],    
                    student: [],
                    status: 'active'
                });
            // Save Group in the database
            group.save()
                .then(data => {
                    res.send(data);
                })
            
            
            
            }).catch(err => {
                return res.status(500).send({
                    message: "Error saving Group with token " + req.params.token + "err: " + err
                });
            });
        }else{
            return res.status(500).send({
                    message: "User " + req.params.instructor + " dont have permisions" 
                });
        }
    }).catch(err => {
        return res.status(500).send({
            message: "Error saving Group with token " + req.params.token + "err: " + err
        });
    });       
};


// Retrieve and return all Groups from the database.
exports.findAll = (req, res) => {
    Group.find()
    .then(Groups => {
        res.send(Groups);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Groups."
        });
    });
};

// Delete a Group with the specified token in the request
exports.delete = (req, res) => {
    if(!req.params.token) {
        return res.status(400).send({
            message: "Token can not be empty"
        });
    }
    Group.findOneAndDelete({token : req.params.token}).then(group =>{
        if(!group) {
            return res.status(404).send({
                message: "Group not found with token " + req.params.email
            });
        }
        res.send(group);
    }).catch(err => {
        return res.status(500).send({
            message: "Error deleting Group with token " + req.params.email + " Err:" +err
        });
    });
};