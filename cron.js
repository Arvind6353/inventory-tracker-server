var mailer = require('nodemailer');
mailer.SMTP = {
    host: 'email-smtp.us-east-1.amazonaws.com', 
    port:587,
    use_authentication: true, 
    user: 'you@example.com', 
    pass: 'xxxxxx'
};


function sendMail() {
	fs.readFile("./package.json", function (err, data) {

    mailer.send_mail({       
        sender: 'sender@sender.com',
        to: 'dest@dest.com',
        subject: 'Attachment!',
        body: 'mail content...',
        attachments: [{'filename': 'attachment.txt', 'content': data}]
    }), function(err, success) {
        if (err) {
            // Handle error
        }

    }
});
}