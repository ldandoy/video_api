const express = require('express');
const twModel = require('../models/tw');

const Router = express.Router();

/*let tws = [{
    id: 0,
    msg: "Ceci est un twitt",
    author: "Loïc DANDOY"
},{
    id: 1,
    msg: "Ceci est un twitt",
    author: "Loïc DANDOY"
},{
    id: 2,
    msg: "Ceci est un twitt",
    author: "Loïc DANDOY"
}];*/

// GET: /api/tws
Router.get('/api/tws', (req, res, next) => {
    twModel.find()
    .populate('user')
    .then(tws => res.status(200).send(tws))
    .catch(error => next(error));
});

// GET: /api/tws/:twId
Router.get('/api/tws/:twId', (req, res, next) => {
    const id = req.params.twId;

    twModel.findOne({_id: id})
    .populate('user')
    .then(tw => {
        if (tw === null)
            res.status(200).send("Le twit n'a pas été trouvé.")
        res.status(200).send(tw)
    })
    .catch(error => next(error));
});

// POST: /api/tws
Router.post('/api/tws', (req, res, next) => {
    const tw = new twModel({
        body: req.body.body,
        user: req.body.userId,
    });

    tw.save()
    .then(tw => {res.status(200).send(tw)})
    .catch(error => {next(error)});
});

// PATCH /api/tws/:twId
Router.patch('/api/tws/:twId', (req, res, next) => {
    const id = req.params.twId;

    twModel.updateOne({_id: id}, {$set: {body: req.body.body}})
    .then(tw => {res.status(200).send("Twitt bien modifié.")})
    .catch(error => {next(error)});
});

// DELETE /api/tws/:twId
Router.delete('/api/tws/:twId', (req, res, next) => {
    const id = req.params.twId;

    twModel.remove({_id: id})
    .exec()
    .then(result => {res.status(202).send('Twitt bien supprimé.')})
    .catch(error => {next(error)});
})

module.exports = Router;