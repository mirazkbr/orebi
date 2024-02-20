const express = require("express");
const merchantController = require("../../controller/merchantController");
const getAllMerchants = require("../../controller/getAllmerchants");
const router = express.Router()

router.post("/becomemerchant", merchantController)

router.get('/getmerchatslist', getAllMerchants)

module.exports = router;