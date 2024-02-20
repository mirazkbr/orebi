const productSchema = require("../models/productSchema");

async function getProducts(req, res) {
    console.log("Hello from getProducts");
    const getallproducts = await productSchema.find({});
    res.send(getallproducts);
}
module.exports = getProducts