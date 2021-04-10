
const express = require('express');
const path = require('path');
const {player,character,enemy,level} = require('./models.js');

const gameRouter = express.Router();

const loggedin = (req, res, next) => {
    try {
        if(req.session.authenticated) {
            next();
        }
        else res.render('errorpage', {message: "You've got to be logged in to do that."});
    }
    catch {
        res.status(400);
    }
}

// gameRouter.use(loggedin);

// Middleware to check that the user has a player document, and whether progress has been set.
const gotPlayer = (req, res, next) => {
    if(req.session.player) {
        next();
        // TODO: Finish setup under /game/intro and set "progress" to truthy
        //if(req.session.player.progress) next();
        //else res.redirect('intro/');
    }
    else {
        player.findOne({user: req.session.userid}, async (error, result)=>{
            if(error) res.status(500);
            else if(!result) {
                try {
                    let playe = new player({user: req.session.userid});
                    await playe.save();
                    res.redirect('intro/')
                }
                catch(e) {
                    res.status(500);
                }
            }
            else {
                req.session.player = result;
                if(req.session.player.progress) next();
                else res.redirect('intro/')
            }
        });
    }
}


gameRouter.get('/', gotPlayer, async (req, res) => {
    if(req.originalUrl=='/game') res.redirect('/game/');
    else res.render('game');
});

//NEW GAME

gameRouter.get('/intro/', async (req,res) => {
    console.log(req.session);
    console.log(req.session.player.progress);
    if(req.session.player.progress) res.redirect('/game/')
    else {
        var p;
        try {
            let newPlayer = req.session.player;
            console.log(newPlayer);
        }
        catch(e) {
            console.log(e);
        }
        res.render('intro');
    }
});

// FIGHT!

gameRouter.get('/fight/', (req,res)=> {
    res.render('combat');
});


module.exports = gameRouter;