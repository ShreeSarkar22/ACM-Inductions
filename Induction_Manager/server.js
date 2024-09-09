const express = require('express');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = 3000;

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

const getEmailsFromFile = () => {
  return fs.readFileSync(path.join(__dirname, 'emails.txt'), 'utf-8').split('\n').filter(Boolean);
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '<yourmail>@gmail.com',        // insert your gmail address here
    pass: '16-character-passcode'         // get this from app password from google after enabling 2 step verification
  }
});


app.post('/send-emails', (req, res) => {
  const emails = getEmailsFromFile();
  const subject = req.body.subject;
  const message = req.body.message;

  const mailOptions = {
    from: '<yourmail>@gmail.com',        // insert your gmail address here
    to: emails,
    subject: subject,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Error sending emails.' });
    } else {
      console.log('Emails sent: ' + info.response);
      res.status(200).json({ success: true, message: 'Emails sent successfully.' });
    }
  });
});


const addEmailToFile = (email) => {
  fs.appendFileSync(path.join(__dirname, 'emails.txt'), `${email}\n`, 'utf8');
};


const addUserToFile = (name, id, email) => {
  const userData = `Name: ${name}, ID: ${id}, Email: ${email}\n`;
  fs.appendFileSync(path.join(__dirname, 'users.txt'), userData, 'utf8');
};


app.post('/add-user', (req, res) => {
  const { name, id, email } = req.body;

 
  addUserToFile(name, id, email);


  addEmailToFile(email);

  res.status(200).json({ success: true, message: 'User data and email stored successfully.' });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});