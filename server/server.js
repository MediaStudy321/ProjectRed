const express= require("express");
const ejs = require("ejs");
const path = require("path");
const http = require('http');
const mongoose = require('mongoose');
const session = require('express-session');


const dotenv = require('dotenv').config();
const dburl = process.env.DB_URL;
const sessionSecret = process.env.SECRET;
const port = process.env.PORT;

mongoose.connect(dburl, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
const clientPath = path.join(__dirname,'../client/');
const staticPath = path.join(clientPath,'/static/');
const viewPath = path.join(clientPath,'/views/');

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

// app.set ('view engine','ejs');
// app.set ('views', viewPath);

// app.get ('/', function (req, res){
//     res.render('index');
// });

// app.get ('/about', function (req, res){
//     res.render('about');
// });

// app.get ('/game', function (req, res){
//     res.render('game');
// });
// app.get ('/profile', function (req, res){
//      res.render('profile');
//  });

app.use(express.static(staticPath));

const server = http.createServer(app);
app.listen(2000);
