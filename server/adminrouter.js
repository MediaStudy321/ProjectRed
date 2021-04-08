
const express = require('express');
const {user,player,character,enemy,level} = require('./models');

const adminRouter = express.Router();

adminRouter.use((req, res, next)=>{
    if(req.session.isAdmin) next();
    else res.redirect('/');
});

adminRouter.get('/', (req, res)=>{
    res.render('adminpage', {data: req.session});
 });

 adminRouter.get('/fetch/:type', async (req, res)=> {
    try {
        var report;
        switch (req.params.type) {
            case 'user':
                report = await user.find({});
                res.render('reports/user', {data: report})
                break;
            case 'player':
                report = await player.find({});
                res.render('reports/player', {data: report})
                break;
            case 'character':
                report = await character.find({});
                res.render('reports/character', {data: report})
                break;
            case 'enemy':
                report = await enemy.find({});
                res.render('reports/enemy', {data: report})
                break;
            case 'level':
                report = await level.find({});
                res.render('reports/level', {data: report})
                break;
            default:
                res.status(404);
        }
    }
    catch (e) {
        res.status(500).send(e);
    }
})
 
 module.exports = adminRouter;