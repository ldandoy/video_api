const express = require('express');
const userModel = require('../models/user');
const chekAuth = require('../middlewares/auth');

const Router = express.Router();

// POST: /api/users
Router.post('/api/users', (req, res, next) => {
    const user = new userModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    user.save()
    .then(tw => {res.status(200).send(user)})
    .catch(error => {next(error)});
});

// GET: /api/users/me
Router.get('/api/users/me', chekAuth, (req, res, next) => {
    console.log(req.session);
    res.status(200).send(req.session.user);
});

module.exports = Router;