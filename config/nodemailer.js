const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const env = require('./environment');

// this is part which sends email
let transporter = nodemailer.createTransport(env.smtp);

  
     //defines whenever I m going to send HTML request file would be placed inside views   // relativePath :from where the mail is being send
let renderTemplate = (data , relativePath ) => {
  let mailHTML;
  ejs.renderFile(
       path.join(__dirname, '../views/mailers' , relativePath),
       data,
       function(err, template){
           if(err){console.log('error in rendering template'); return;}

           mailHTML = template;

       }
  )
  return mailHTML;
}


module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}