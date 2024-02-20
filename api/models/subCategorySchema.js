const mongoose = require('mongoose');
const { Schema } = mongoose;

const subCategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    isActive: {
        type: Boolean,
        default: false
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "categorySchema"  // Use the model name 'categorySchema'
    },
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
}, { timestamps: true });  // Automatically add 'createdAt' and 'updatedAt'

module.exports = mongoose.model('subcategorydetail', subCategorySchema);
