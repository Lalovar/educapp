const mongoose = require('mongoose');


//Group Schema
const GroupSchema = mongoose.Schema({
    token: String,
    name: String,
    status: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Group', GroupSchema);