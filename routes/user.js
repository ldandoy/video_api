const express = require('express');
const userModel = require('../models/user');;

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

module.exports = Router;