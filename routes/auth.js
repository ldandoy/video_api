const express = require('express');
const userModel = require('../models/user');

const Router = express.Router();

Router.post('/register', (req, res, next) => {
    const { email, password, password2, username } = req.body
    if ((email && email != "") && (password && password != "") && (password2 && password2 != '')) {
        if (password == password2) {
            // console.log(email, password2, password);
            const user = new userModel({
                email:      email,
                password:   password,
                username:   username
            });
        
            user.save()
            .then(user => {
                res.status(200).send(user)
            })
            .catch(error => {next(error)});

            // res.status(200).send('ok');
        } else {
            next({'message': "Les deux mots de mots de passe ne sont identiques"});
        }
    } else {
        next({'message': "Les champs de sont pas tous rempli"});
    }
});

Router.post('/login', (req, res, next) => {
    const { email, password } = req.body;
    userModel.findOne({
        email: email,
        password: password
    })
    .then((user) => {
        
        if (!user) {
            next({'message': "Mauvais email ou mot de passe"})
            return
        }

        req.session.user = user;
        res.status(200).send(user);
    })
});

module.exports = Router;