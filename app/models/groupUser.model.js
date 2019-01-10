const mongoose = require('mongoose');


//GroupUser Schema
const GroupUserSchema = mongoose.Schema({
    email: String,
    token: String,
    role: String,
    status: String
}, {
    timestamps: true
});

module.exports = mongoose.model('GroupUser', GroupUserSchema);  