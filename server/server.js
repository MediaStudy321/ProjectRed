const express= require("express");
const ejs = require("ejs");
const path = require("path");

const clientPath = path.join(__dirname,'../client/');
const staticPath = path.join(clientPath,'/static/');
const viewPath = path.join(clientPath,'/views/');

const app = express();

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
//     res.render('profile');
// });

app.use(express.static(staticPath));

app.listen(2000);
