const mongoose = require('mongoose');


//User Schema
const UserSchema = mongoose.Schema({
    email: String,
    password: String, 
    full_name: String,    
    type: String,
    status: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);