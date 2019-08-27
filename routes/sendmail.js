const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

router.post('/', function (req, res, next) {
  console.log("Send email.");
  let user = req.body;
  jwt.sign({user}, 'secretkey', { expiresIn: '24h' }, (err, token) => {
    sendEmail(user, token, info => {
      console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
      res.send(info);
    });
  });

});

async function sendEmail(user, token, callback) {
  var config = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'mifort.dream.project@gmail.com',
      pass: 'dreamproject2019'
    }
  };
  var transporter = nodemailer.createTransport(config);
  const link = `http://localhost:4200/sign-up?default-company=${token}`;
  console.log(link);
  var mailOptions = {
    from: 'Mifort Timesheet <mifort.dream.project@gmail.com>',
    to: user.email,
    subject: user.theme,
    text: `Hi,

    “${user.company}” has invited you to log your working time in their organization account. Join them using the link: ${link}
    If you don’t want to join this organization, just ignore this email.
    
    Regards,
    Mifort Timesheet Team`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};


module.exports = router;






