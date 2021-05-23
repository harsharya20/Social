const nodeMailer = require('../config/nodemailer');

// this is another way of exporting a method
exports.newComment = (comment) => {
    console.log('Inside newComment mailer');

    //for sending mail
    nodeMailer.transporter.sendMail({
      from: 'harya9263@gmail.com', //isme kon sa mail daalte h? /// jo nodemailer me diya ho isme dusrA MAIL DAAL KE DEKHU? try kr
      to: comment.user.email,
      subject: 'New comment published!', // google account pr jaana 
      html: '<h1>Yup , Your comment is now published!</h1>'
    }, (err, info) => {
        if(err){
            console.log('error in sending mail', err);
            return; 
        }

        console.log('Message sent', info);// apne gmail se 2 step verification on kr rkhi h ? ye kya hota h yeh ek authentication hoti h gmail ki jisse apka account secure rhe kaise krte h
        // apne google account pr jao jo email me diya h uske
        return;
    }
    );
}