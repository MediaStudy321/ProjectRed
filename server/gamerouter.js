
const express = require('express');
const path = require('path');
const {player} = require('./models.js');
const { heroSet, monsterSet } = require('./gameconstants');

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

const gotPlayer = (req, res, next) => {
    if(req.session.player.progress==0) res.redirect('/intro/');
    else next();
}

gameRouter.use(loggedin);
gameRouter.use(gotPlayer);

gameRouter.get('/', async (req, res) => {
    console.log(req.session);
    res.render('game');
});

gameRouter.get('/battle/', (req, res)=>{
    res.render('battle')
})

gameRouter.post('/battle/victory', (req, res)=>{
    console.log(req.session);
    try {
        var playe = await player.findOne({user:req.session.userid});
        playe.progress= playe.progress++;
        playe.rolls= playe.rolls++;
        playe.save();
        req.session.player = playe;
    }
    catch (e) {
        res.status(500);
        console.log(e);
    }
    res.render('victorypage', {message: 'Congratulation you earned one gold nugget. This can be exchanged for one soul.'});
})

//COMBAT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// TODO: Fetch based on 1) player heroes, 2) player progress through the game

//waiting on party page <- to do game heros\

gameRouter.get('/battle/getheroes', (req, res)=>{
    let party = [heroSet.Ed]
    res.send(party);
 });

gameRouter.get('/battle/getmonsters', async (req, res)=>{
    let progress = req.session.player.progress;
    if(level.includes(progress)){
        let level = levels[progress]
        let party = [level.enemy1, level.enemy2, level.enemy3];
        res.send(party);
    }
    else res.render('notification', {message: 'This level is not designed yet. Sorry :('}); 
 });


 gameRouter.get('/party/getpartyheroes', (req, res)=>{
    let party = [heroSet.Ed]
    res.send(party);
 });

gameRouter.get('/gacha/', async(req, res)=>{
    res.render('gacha')
})

module.exports = gameRouter;
