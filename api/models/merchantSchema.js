const mongoose = require('mongoose');
const { Schema } = mongoose;

const merchantSchema = new Schema({
    storeName: {
        type: String,
        required: true
    },
    storeEmail: {
        type: String,
        required: true
    },
    storeTelephone: {
        type: String,
        required: true
    },
    storeAddress: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "userdetail"
    },
    products: {
        type: Schema.Types.ObjectId,
        ref: "productList"
    }
});

module.exports = mongoose.model('merchantlist', merchantSchema);
