// const queue = require('../config/kue');

// const commentsMailer = require('../mailers/comments_mailer');

// //creating the worker (send emails for us intead of sending via controller)
// queue.process('emails', function(jobs, done){   //emails is the queue used in comments_controller
//     console.log('emails worker is processing a job', job.data);

//     commentsMailer.newComment(job.data); //holds the comment which is send to the mail

//     done();
// });