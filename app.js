const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const port = 3000;

//gunakan ejs
app.set('view engine', 'ejs');
// Setup body parser middleware untuk membaca POST request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('views'));

app.get('/', (req, res) => {
  console.log('bisa');
  res.render('index');
  
});
app.get('/contact', (req, res) => {
  console.log('bisa');
  res.render('contact');
  
});

app.get('/send-email', (req, res, next) => {
  const { name, email, message } = req.body;

  // Setup Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',  // Anda bisa mengganti dengan layanan email lainnya
    auth: {
      user: 'muchamadlakafaizulamin@gmail.com',
      pass: 'objqswgyezdfgurg',
    },
  });

  const mailOptions = {
    from: email,  // pengirim adalah email yang dikirim dari form
    to: 'muchamadlakafaizulamin@gmail.com',  // email tujuan
    subject: 'Pesan dari Kontak Form',
    text: `
      Nama: ${name}
      Email: ${email}
      Pesan: ${message}
    `,
  };

  // Mengirim email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Terjadi kesalahan dalam mengirim email');
    }
    console.log('Email terkirim');
    next();
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});