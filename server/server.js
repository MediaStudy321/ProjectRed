const express= require("express");
const ejs = require("ejs");
const path = require("path");
const http = require('http');
const mongoose = require('mongoose');
const session = require('express-session');

const requestRouter = require('./router.js');
const gameRouter = require('./gamerouter.js');
const adminRouter = require('./adminrouter.js');


const dotenv = require('dotenv').config();
<<<<<<< HEAD
const dburl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/projectred';
=======
const dburl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/ProjectRed';
>>>>>>> development
const sessionSecret = process.env.SECRET || 'catdogmeowoof' ;
const port = process.env.PORT || 2000;

mongoose.connect(dburl, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
const clientPath = path.join(__dirname,'../client/');
const staticPath = path.join(clientPath,'/static/');
const viewPath = path.join(clientPath,'/views/');
app.use(express.static(staticPath));
app.set ('view engine','ejs');
app.set ('views', viewPath);

app.use(express.urlencoded({extended: true}));

app.use(session({
    cookie: {
        maxAge: 1000*60*60*24*7,
        secure: false
    },
    key: 'user_sid',
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    name: 'projectred'
}));

app.use((req,res,next)=>{
    console.log(req.originalUrl);
    next();
})

app.use('/', requestRouter);
app.use('/game/', gameRouter);
app.use('/admin/', adminRouter);


const server = http.createServer(app);
app.listen(port);
