const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    isActive: {
        type: Boolean,
        default: false
    },
    subCategory: [
        {
            type: Schema.Types.ObjectId,
            ref: "subcategorydetail" // Use the model name 'subcategorydetail'
        }
    ],
    status: {
        type: String,
        default: 'waiting',
        enum: ['waiting', 'approved', 'rejected']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CategoryDetail', categorySchema);
