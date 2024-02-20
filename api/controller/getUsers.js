const userSchema = require("../models/userSchema");

async function getUsers(req, res) {
    
    const getallusers = await userSchema.find({});
    res.send(getallusers);
    console.log(getallusers);
}
module.exports = getUsers