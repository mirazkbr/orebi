const express = require('express')
const router = express.Router()
const signUp = require('../../controller/sign-up');
const emailVerify = require('../../controller/email.verify');
const signIn = require('../../controller/sign-in');
const getUsers = require('../../controller/getUsers');

router.post('/sign-up', signUp)
router.post("/sign-in", signIn)
router.post('/emailverify', emailVerify)

router.get('/getallusers', getUsers)



module.exports = router;