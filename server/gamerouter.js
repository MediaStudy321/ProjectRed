
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
    // TODO: Rewards.  Lookup a player, add 1 to their progress, save, redirect to wherever.
    res.send('good job');
})

//COMBAT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// TODO: Fetch based on 1) player heroes, 2) player progress through the game

gameRouter.get('/battle/getheroes', (req, res)=>{
    let party = [heroSet.Ed]
    res.send(party);
 });

gameRouter.get('/battle/getmonsters', (req, res)=>{
   let party = [monsterSet.Leeches];
    res.send(party);
 });


module.exports = gameRouter;
