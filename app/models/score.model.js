const mongoose = require('mongoose');


//Score Schema
const ScoreSchema = mongoose.Schema({
    activityName: String,
    email: String, 
    score: Number,
    status: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Score', ScoreSchema);