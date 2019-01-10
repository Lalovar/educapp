const User = require('../models/user.model.js');

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if(!req.body.email) return res.status(400).send({
            message: "email content can not be empty"
        });
    if(!req.body.password) return res.status(400).send({
            message: "password content can not be empty"
        });
    if(!req.body.full_name) return res.status(400).send({
            message: "full_name content can not be empty"
        });
    if(!req.body.type) return res.status(400).send({
        message: "type content can not be empty"
        });
         User.find({"email" : req.body.email}).then(user => {
            if(user.length) {
                return res.status(500).send({
                    message: "Error saving User with email " + req.body.email + " ERR: it already exists"
                });  
            }
            // Create a User
        user = new User({
            email: req.body.email.toLowerCase(),
            password: req.body.password, 
            full_name: req.body.full_name,    
            type: req.body.type,
            status: 'active'
        });
    // Save User in the database
    user.save()
        .then(data => {
            res.send(data);
        })
    }).catch(err => {
        return res.status(500).send({
            message: "Error saving User with email " + req.params.email + "err: " + err
        });
    });
};

// Retrieve and return all Users from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(Users => {
        res.send(Users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Users."
        });
    });
};

// Find a single User with a email
exports.findByEmail = (req, res) => {
    User.find({"email" : req.params.email.toLowerCase()}).then(user => {
        if(!user.length) {
            return res.status(404).send({
                message: "User not found with email " + req.params.email
            });            
        }
        res.send(user);
    }).catch(err => {
        return res.status(500).send({
            message: "Error retrieving User with email " + req.params.email + " Err:" +err
        });
    });
};



// Update a User identified by the UserId in the request
exports.updateByEmail = (req, res) => {
    // Validate Request
    if(!req.params.email) {
        return res.status(400).send({
            message: "User email can not be empty"
        });
    }
    User.findOneAndUpdate({"email" : req.params.email},
        {email: req.body.email, 
         password: req.body.password, 
         full_name: req.body.full_name,    
         type: 'student',
         status: req.body.status || "active"},
         { returnNewDocument: true }
    ).then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with email " + req.params.email
            });
        }
        res.send(user);
    })
    .catch(err => {
        return res.status(500).send({
            message: "Error updating User with email " + req.params.email + " Err:" +err
        });
    });
};


// Delete a User with the specified UserId in the request
exports.delete = (req, res) => {
    if(!req.params.email) {
        return res.status(400).send({
            message: "User email can not be empty"
        });
    }
    User.findOneAndDelete({email : req.params.email}).then(user =>{
        if(!user) {
            return res.status(404).send({
                message: "User not found with email " + req.params.email
            });
        }
        res.send(user);
    }).catch(err => {
        return res.status(500).send({
            message: "Error deleting User with email " + req.params.email + " Err:" +err
        });
    });
};

// email: retrive all groups of the user
// token: retrive all users of a group
exports.login = (req, res) => {
    User.find({"email" : req.body.email.toLowerCase(), "password" : req.body.password}).then(user =>{
        if(!user.length){
            return res.status(404).send({
                message : "Error can't process or some data dont match"
            });
        }
        res.send(user)
    }).catch(err =>{
        return res.status(500).send({
            message : "Error can't process or some data dont match: " +err
        })
    })
}