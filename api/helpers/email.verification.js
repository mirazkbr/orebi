const nodemailer = require('nodemailer');

async function emailVerification(email, subject, template){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mo.miraz25@gmail.com',
            pass: 'dfrzjsseyocfcemu'
        }
    }); 
    const info = await transporter.sendMail({
        from: '"OREBI" <mo.miraz25@gmail.com>',
        to: email,
        subject: subject,
        html:  template
      });
}
module.exports = emailVerification