const merchantSchema = require("../models/merchantSchema");

async function getAllMerchants(req, res) {
    
    const getallmerchants = await merchantSchema.find({});
    res.send(getallmerchants);
    console.log(getallmerchants);
}
module.exports = getAllMerchants