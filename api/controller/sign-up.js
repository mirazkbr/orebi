const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const userSchema = require('../models/userSchema')
const emailVerification = require('../helpers/email.verification')
const emailValidation = require('../helpers/email.validation')
const emailTemplate = require('../helpers/email.template')
var jwt = require('jsonwebtoken');

async function signUp(req, res){
        console.log(req.body)
        const {
            firstname,
            lastname,
            email,
            password,
            telephone,
            address,
            city,
            postcode,
            division,
            district,
        }=req.body;
        if(!firstname || !lastname || !email || !password || !telephone){
            return res.json({
                status: "FAILED",
                message: "Empty input fields!"
            })
        }
        if(!emailValidation(email)){
            return res.json({
                status: "FAILED",
                message: "Invalid email!"
            })
        }
        const uniqueEmail = await userSchema.find({email: email});
        if(uniqueEmail.length>0){
            return res.json({
                status: "FAILED",
                message: "Email already exists!"
            })
        }
        bcrypt.hash(password, 10, function(err, hash) {
            let user = new userSchema({
                firstname: firstname, 
                lastname:lastname,
                email: email,
                password: hash,
                telephone: telephone,
                address: address,
                city: city,
                postcode: postcode,
                postcode: postcode,
                division: division,
                district: district
            })
            // Save the user to the database
            user.save()
            var token = jwt.sign({email}, 'secret');
            emailVerification(email,"Email VERIFICATION", emailTemplate(token))
            return res.send(user)
        });
}
module.exports = signUp