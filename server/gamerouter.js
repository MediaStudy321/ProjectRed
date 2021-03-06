
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
// TODO: Fetch based on 1) player heroes

//waiting on party page <- to do game heros\

gameRouter.get('/battle/getheroes', (req, res)=>{
    let party = [];
    let partynames = [req.session.player.party.first,req.session.player.party.second,req.session.player.party.third]
    console.log(partynames);
    for(i=0;i<partynames.length;i++){
        if(heroSet[partynames[i]]){
        console.log(partynames[i]);
        party.push(heroSet[partynames[i]]);
        }
    }
    console.log(party);
    res.send(party);
 });

gameRouter.get('/battle/getmonsters', (req, res)=>{
    let party = [];
    let progress = req.session.player.progress;
    if(levels[progress]){
        var constparty = levels[progress]
        for(i=1;i<4;i++){
            if(monsterSet[constparty["enemy"+i]]){
                party.push(monsterSet[constparty["enemy"+i]]);
            } else{
               console.log('error');
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

gameRouter.post("/party/setparty", async (req, res) => {
  console.log(req.body);
  try {
    partyAr=Object.values(req.body)
    uniqueParty= new Set(partyAr)
    let arr= Array.from(uniqueParty)
    console.log(uniqueParty)
    var playe = await player.findOne({ user: req.session.userid });
    playe.party.first = arr[0];
    playe.party.second = arr[1];
    playe.party.third = arr[2];
    playe.save();
    req.session.player = playe;
  } catch (e) {
    res.status(500);
    console.log(e);
  }
});




gameRouter.get('/gacha/', (req, res)=>{
  res.render('gacha')
});

gameRouter.get('/gacha/reward', (req, res)=>{
  player.findOne({user:req.session.userid}, (error, result)=>{
    if(error) {
      console.log(error)
      res.status(500).send('ERROR');
    }
    else if(!result) {
      console.log('Player not found')
      res.status(404).send('Player not found');
    }
    else {
      if(result.rolls>0) {
        let allKeys = Object.keys(heroSet);
        let keySet = allKeys.filter(n => !result.characters.includes(n));
        console.log(keySet)
        let n = Math.floor(Math.random()*keySet.length);
        result.characters.push(keySet[n]);
        result.rolls--;
        result.save();
        res.send(heroSet[keySet[n]]);
      }
      else res.send('NO MORE');
    }
  })
});

module.exports = gameRouter;
