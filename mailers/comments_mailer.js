const nodeMailer = require('../config/nodemailer');

// this is another way of exporting a method
exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate({comment : comment},'/comments/new_comment.ejs');

    //for sending mail
    nodeMailer.transporter.sendMail({
      from: 'harshoffice@gmail.com', 
      to: comment.user.email,
      subject: 'New comment published!', // google account pr jaana 
      html: htmlString
    }, (err, info) => {
        if(err){
            console.log('error in sending mail', err);
            return; 
        }

        console.log('Message sent', info);
        return;
    }
    );
}