require ('dotenv').config();
const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const hsts = require('./middleware/hsts.js');
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL).then(() => console.log('DB connected'));
//mongoose.connect('mongodb+srv://ST10081854:OImcLS6eMik1J3zL@cluster0.i96ywnf.mongodb.net/?retryWrites=true&w=majority').then(() => console.log('DB connected'));

app.use(cors({ origin: 'https://localhost:3000', optionsSuccessStatus: 200}))

app.use((reg,res,next)=>
{
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,ContentType,Accept,Authorization');
 res.setHeader('Access-Control-Allow-Methods', '*');
 next();
});

app.use(express.json());
app.use(hsts);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/post', require('./routes/post'));

https.createServer({

    key: fs.readFileSync('./keys/privatekey.pem'),
    cert: fs.readFileSync('./keys/certificate.pem'),
    passphrase: 'apds',
},app).listen(3000)

module.exports = app;