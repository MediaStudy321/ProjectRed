const express = require('express');
const {user, player} = require('./models.js');
const bcrypt = require('bcrypt');
const fire = 10;

const requestRouter = express.Router();

requestRouter.get('/', (req, res) => {
    res.render('index');
});

requestRouter.get('/intro/', (req, res)=>{
    if(!req.session.authenticated) res.redirect('/');
    if(req.session.player.progress>0) res.redirect('/game/');
    else res.render('intro');
});

requestRouter.post('/intro/begin', async (req,res) => {
    console.log(req.body)
    try {
        var playe = await player.findOne({user:req.session.userid});
        playe.characters.push(req.body.character);
        playe.progress=1;
        playe.save();
        req.session.player = playe;
    }
    catch (e) {
        res.status(500);
        console.log(e);
    }
    res.redirect('/game/');
});

requestRouter.post('/login', async (req,res) => {
    try {
        await user.findOne({username: req.body.username}, async (err, result) => {
            if(err) {console.log(err)}
            else {
                if(result) {
                    try {
                        let passmatch = bcrypt.compare(req.body.password, result.password)
                        if(passmatch) {
                            req.session.authenticated = true;
                            req.session.username = result.username;
                            req.session.userid = result._id;
                            req.session.isAdmin = result.isAdmin;
                            req.session.player = await player.findOne({user: result._id});
                            res.redirect('/game/');
                        }
                        else res.render('errorpage', {message: 'Incorrect password.'});
                    }
                    catch(e) {
                        console.log(e)
                        res.send('ERROROMG')
                    }
                }
                else {
                    res.render('errorpage', {message: 'No account with that username'});
                }

            }
        });
    }
    catch(e) {
        console.log(e);
        res.render('errorpage', {message:'There was an error processing your login.'});
    }
});

requestRouter.post('/register', async (req, res) => {
    if(req.body.password==req.body.passwordconfirm) {
        try {
            let hashedPass = await bcrypt.hash(req.body.password,fire);
            var newUser = new user({username: req.body.username, password: hashedPass});
            console.log(newUser);
            await newUser.save();
            var newPlayer = new player({user: newUser._id});
            await newPlayer.save();
            req.session.authenticated = true;
            req.session.userid = newUser._id;
            req.session.player = newPlayer;
            res.redirect('/game/');
        }
        catch(e) {
            console.log(e);
            res.render('errorpage', {message: e});
        }
    }
    else {
        res.render('errorpage', {message:'Passwords do not match.'});
    }
});

requestRouter.get('/logout', (req,res) => {
    req.session.destroy(()=>{res.redirect('/')});
});

module.exports = requestRouter;