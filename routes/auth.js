const express   = require('express');
const userModel = require('../models/user');
const bcrypt    = require('bcrypt')

const Router = express.Router();

Router.post('/register', (req, res, next) => {
    const { email, password, password2, username} = req.body;
    if ((email && email != "") && (password && password != "") && ( password2 && password2 != "") && (username && username != "")) {
        if (password == password2) {
            bcrypt.hash(password, 10, (error, hash) => {
                if (error) {
                    next({message: 'Erreur lors du hash du mot de passe.'})
                } else {
                    const user = new userModel({
                        email: email,
                        password: hash,
                        username: username
                    });
        
                    user.save()
                    .then(user => res.status(200).json(user))
                    .catch(error => next(error));
                }
            })
        } else {
            next({message: "La vérification du mot de passe n'est pas bonne."})
        }
    } else {
        next({message: "Tous les champs ne sont pas rempis"})
    }
});

Router.post('/login', (req, res, next) => {
    const { email, password} = req.body;
    if ((email && email != "") && (password && password != "")) {
        userModel.findOne({
            email: email
        })
        .then(user => {
            if (!user) {
                next({message: "Erreur lors de l'authentification"});
            } else {
                bcrypt.compare(password, user.password, (error, result) => {
                    if (error) {
                        next(error)
                    } else {
                        req.session.user = user;
                        res.status(200).json(user);
                    }
                });
            }
        })
        .catch(error => next(error));
    } else {
        next({message: "Tous les champs ne sont pas rempis"});
    }
});

module.exports = Router;