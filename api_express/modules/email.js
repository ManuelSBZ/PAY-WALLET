const nodemailer = require("nodemailer");


function email(service, auth ,from, to, subject, text){

    const transporter = nodemailer.createTransport({
        service: service,
        auth:auth
      });
    
    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: text
      };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
}
module.exports = email

// email("gmail",{user:"paysemecorp98@gmail.com",pass:"semecorp98"},"paysemecorp","manumeco98@gmail.com","hello body","nice to meet you")