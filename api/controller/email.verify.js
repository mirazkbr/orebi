var jwt = require('jsonwebtoken');
const userSchema = require('../models/userSchema')

async function emailVerify(req, res){
    // console.log(req.headers)
    const {authorization} = req.headers
    // console.log(authorization)
    var decoded = jwt.verify(authorization, 'secret');
    console.log(decoded.email) 
    const updateUser =await userSchema.findOneAndUpdate({email: decoded.email}, {verified: true}, {new: true})
    return res.json('success')
}
module.exports = emailVerify