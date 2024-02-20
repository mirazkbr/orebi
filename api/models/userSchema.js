const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    address: String,
    city: String,
    postcode: String,
    division: String,
    district: String,
    verified: { 
        type: Boolean, 
        default: false 
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin', 'merchant']
    }
})
module.exports = mongoose.model('userdetail', userSchema)