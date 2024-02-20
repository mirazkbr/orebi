const express = require("express");
const {productUploadController, secureProductController} = require("../../controller/productUploadController");
const getProducts = require("../../controller/getProducts");
const router = express.Router()

router.post("/productslist", secureProductController, productUploadController);

router.get("/getallproducts", getProducts)


module.exports = router;