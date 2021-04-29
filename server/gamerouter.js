
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

gameRouter.use(loggedin);

const gotPlayer = (req, res, next) => {
    if(req.session.player) {
        if(req.session.player.progress) next();
        else res.redirect('intro/');
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
    console.log(req.session);
    res.render('game');
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

gameRouter.post('/intro/characters', async (req,res) => {
    try {
        var playe = await player.findOne({user:req.session.userid});
        playe.characters.push();
        playe.progress=1;
        await playe.save();
        res.send('SUCCESS');
    }
    catch (e) {
        res.status(500);
        console.log(e);
    }
});

//COMBAT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

gameRouter.get('/getheroes', (req, res)=>{
//     //  The game client expects an array, but our sampleHeroes are a JSON object.
//     //  It will be necessary to construct the array server-side.  Since
//     //  this is an example, the construction will be arbitrary.  In a full
//     //  game, you would be building this based on what the player(s) had
//     //  unlocked at that stage, based on their account information etc.

//     // RED TODO:
//     // 1.  Get player hero lineup


    let party = [sampleHeroes.cloud, sampleHeroes.aeris]
    res.send(party);
 });

gameRouter.get('/getmonsters', (req, res)=>{

//     // RED STUDIO TODO:
//     // 1.  Look up what level the player is on
//     // 2.  Load up the monsters for that level

    
   let party = [sampleMonsters.fungus, sampleMonsters.fungus]
     res.send(party);
 });


module.exports = gameRouter;