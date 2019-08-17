const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address:String,
    image :String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);      
