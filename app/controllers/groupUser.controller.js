const Group = require('../models/group.model.js');
const User = require('../models/user.model.js');
const GroupUser = require('../models/groupUser.model.js');

// add new student/instructor to groupUser by token
exports.addUser = (req, res) => {
    if(!req.body.email) return res.status(400).send({
            message: "email content can not be empty"
        });
    if(!req.body.token) return res.status(400).send({
            message: "token content can not be empty"
        });
        
    User.find({"email" : req.body.email}).then(user => {
        if(!user.length) {
            return res.status(500).send({
                message: "Error " + req.body.email + " ERR: user dont exists"
            });
        }
    });
    Group.find({"token" : req.body.token}).then(group => {
        if(!group.length) {
            return res.status(500).send({
                message: "Error " + req.body.group + " ERR: group dont exists"
            });
        }
     });
    
    GroupUser.find({"email" : req.body.email, "token": req.body.token}).then(groupUser => {
        if(groupUser.length) {
            return res.status(500).send({
                message: "Error saving User with email " + req.body.email + " ERR: it already exists in group " + req.body.token
            });  
        }
        // Create a GroupUser
        groupUser = new GroupUser({
            email: req.body.email,
            token: req.body.token,
            role: req.body.role,
            status: 'active'
        });
        // Save GroupUser in the database
        groupUser.save()
            .then(data => {
            res.send(data);
        })
    }).catch(err => {
        return res.status(500).send({
            message: "Error saving groupUser with email " + req.params.email + "err: " + err
        });
    });
    
        
};

exports.getAll = (req, res) =>{
    GroupUser.find()
    .then(groupUser => {
        res.send(groupUser);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving groupUser."
        });
    });
}

exports.getByFilter = (req, res) => {
    let emailRegex = /\S+@\S+\.\S+/;
    emailRegex.test(req.params.filter)?
    findByEmail(req.params.filter, res) :
    findByToken(req.params.filter, res);
}    

function findByEmail(email, res){
    GroupUser.find({"email" : email}).then(groupUser => {
    if(!groupUser.length) {
        return res.status(404).send({
            message: "groupUser not found with email " + email
        });            
    }
    res.send(groupUser);
    }).catch(err => {
        return res.status(500).send({
            message: "Error retrieving groupUser with email " + email + " Err:" +err
        });
    });
};

function findByToken(token, res){
    GroupUser.find({"token" : token}).then(groupUser => {
    if(!groupUser.length) {
        return res.status(404).send({
            message: "groupUser not found with token " + token
        });            
    }
    res.send(groupUser);
    }).catch(err => {
        return res.status(500).send({
            message: "Error retrieving groupUser with token " + token + " Err:" +err
        });
    });
};
        
exports.delete = (req, res) => {
    GroupUser.findOneAndUpdate({"email" : req.body.email, "token": req.body.token},
        {email: req.body.email, 
         token: req.body.token, 
         status: "inactive"},
         { returnNewDocument: true }
    ).then(groupUser => {
        if(!groupUser) {
            return res.status(404).send({
                message: "groupUser not found with email " + req.body.email + "and token: " + req.body.token
            });
        }
        res.send(groupUser);
    })
    .catch(err => {
        return res.status(500).send({
            message: "Error deleting groupUser with email " + req.body.email + "and token: " + req.body.token + " Err:" +err
        });
    });
}    


exports.update = (req, res) => {
    GroupUser.findOneAndUpdate({"email" : req.body.email, "token": req.body.token},
        {email: req.body.email, 
         token: req.body.token,
         role: req.body.role,
         status: "active"},
         { returnNewDocument: true }
    ).then(groupUser => {
        if(!groupUser) {
            return res.status(404).send({
                message: "groupUser not found with email " + req.params.email + "and token: " + req.params.token
            });
        }
        res.send(groupUser);
    })
    .catch(err => {
        return res.status(500).send({
            message: "Error deleting groupUser with email " + req.params.email + "and token: " + req.params.token + " Err:" +err
        });
    });
}    