require ('dotenv').config();
const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const hsts = require('./middleware/hsts.js');
const mongoose = require('mongoose');
const { default: helmet } = require('helmet');

mongoose.connect(process.env.MONGODB_URL).then(() => console.log('DB connected'));

app.use(cors({ origin: 'http://localhost:4200', optionsSuccessStatus: 200}))
app.use(express.json());
app.use(helmet())
app.use(morgan("tiny"))
app.use(hsts);

app.use((reg,res,next)=>
{
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,ContentType,Accept,Authorization');
 res.setHeader('Access-Control-Allow-Methods', '*');
 next();
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/post', require('./routes/post'));

https.createServer({

    key: fs.readFileSync('./keys/privatekey.pem'),
    cert: fs.readFileSync('./keys/certificate.pem'),
    passphrase: 'apds',
},app).listen(3000)

module.exports = app;