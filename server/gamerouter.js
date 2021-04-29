
const express = require('express');
const path = require('path');
const {player,character,enemy,level} = require('./models.js');
const { sampleHeroes, sampleMonsters } = require('./gameconstants');

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
    if(req.session.player) {
        if(req.session.player.progress) next();
        else res.redirect('/intro/');
    }
    else {
        player.findOne({user: req.session.userid}, async (error, result)=>{
            if(error) res.status(500);
            else if(!result) {
                try {
                    let playe = new player({user: req.session.userid});
                    await playe.save();
                    res.redirect('/intro/')
                }
                catch(e) {
                    res.status(500);
                }
            }
            else {
                req.session.player = result;
                if(req.session.player.progress) next();
                else res.redirect('/intro/')
            }
        });
    }
}

//gameRouter.use(loggedin);
//gameRouter.use(gotPlayer);

gameRouter.get('/', async (req, res) => {
    console.log(req.session);
    res.render('game');
});

gameRouter.get('/battle/', (req, res)=>{
    res.render('battle')
})


//COMBAT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

gameRouter.get('/battle/getheroes', (req, res)=>{
    //  The game client expects an array, but our sampleHeroes are a JSON object.
    //  It will be necessary to construct the array server-side.  Since
    //  this is an example, the construction will be arbitrary.  In a full
    //  game, you would be building this based on what the player(s) had
    //  unlocked at that stage, based on their account information etc.

    // RED TODO:
    // 1.  Get player hero lineup


    let party = [sampleHeroes.cloud, sampleHeroes.aeris]
    res.send(party);
});

gameRouter.get('/battle/getmonsters', (req, res)=>{

    // RED STUDIO TODO:
    // 1.  Look up what level the player is on
    // 2.  Load up the monsters for that level

    
    let party = [sampleMonsters.fungus, sampleMonsters.fungus]
    res.send(party);
});


module.exports = gameRouter;