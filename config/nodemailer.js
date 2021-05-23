const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

// this is part which sends email
let transporter = nodemailer.createTransport({
    service : 'gmail',
    host: 'smtp.gmail.com',  
    port : 587,
    secure: false,
    auth: {
        user: 'harya9263@gmail.com',  
        pass: 'harsharya123'
    },
    
});

  
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