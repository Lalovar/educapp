const mongoose = require('mongoose');


//Activity Schema
const ActivitySchema = mongoose.Schema({
    name: String,
    type: String,
    content: String,
    groupToken: String, 
    status: String,    
    fromDate: Date,
    toDate: Date
}, {
    timestamps: true
});

module.exports = mongoose.model('Activity', ActivitySchema);