
const express = require('express');
const path = require('path');
const {player} = require('./models.js');
const { heroSet, monsterSet } = require('./gameconstants');
const { levels } = require('./levelconstants');

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

gameRouter.post('/battle/victory', async (req, res)=>{
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

//need to figure out a way to loop through monsterSet and pull the same monster from level constants
gameRouter.get('/battle/getmonsters', (req, res)=>{
    let party = [];
    let progress = req.session.player.progress;
    if(levels[progress]){
        let constparty = levels[progress]
        for(i=0;i<constparty.length; i++){
            let enemy = ("enemy"+i)
            console.log(constparty[i])
            if(monsterSet.includes(constparty[i])){
                console.log(array.indexOf(constparty[i]));
                party.push(array.indexOf(constparty[i]));
            }else{
                res.render('notification', {message: 'This level includes a monster that does not exist'});
            }
        }
        res.send(party);
       }
       else res.render('notification', {message: 'This level is not designed yet. Sorry :('}); 
    });


 gameRouter.get('/party/',(req, res)=>{
    res.render('party')
});
 gameRouter.get('/party/getpartyheroes',(req, res)=>{
    let character = [req.session.player.characters];
    res.send(character);
 });

gameRouter.get('/gacha/', (req, res)=>{
    res.render('gacha')
});

gameRouter.get('/gacha/getcharacters', (req, res)=>{
    console.log("getChar");
    let character = [req.session.player.characters];
    console.log(character);
    res.send(character);
 });

 gameRouter.get('/gacha/getallheroes', (req, res)=>{
    let heroes = [heroSet]
    res.send(heroes);
 });

 gameRouter.post('/gacha/heroPull', async (req, res)=>{
    console.log("heroPull");
    try {
        var playe = await player.findOne({user:req.session.userid});
        playe.characters.push(req.body.character);
        playe.save();
        req.session.player = playe;
    }
    catch (e) {
        res.status(500);
        console.log(e);
    }
})


module.exports = gameRouter;
