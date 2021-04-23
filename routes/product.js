// ~/cours-nodejs/server/routes/productsRoute.js

const express = require('express');
const productModel = require('../models/product');

const Router = express.Router();

// GET: /api/products
Router.get('/products', (req, res, next) => {
    productModel.find()
    .then(products => res.status(200).send(products))
    .catch(error => next(error));
});

// GET: /api/products/:productId
Router.get('/products/:productId', (req, res, next) => {
    const productId = req.params.productId;

    productModel.findOne({_id: productId})
    .then(product => {
        if (product === null)
            res.status(200).send("Le produit n'a pas été trouvé.")
        res.status(200).send(product)
    })
    .catch(error => next(error));
});

// POST: /api/products
Router.post('/products', (req, res, next) => {
    const product = new productModel({
        body: req.body.body,
        user: req.body.userId,
    });

    product.save()
    .then(product => {res.status(200).send(product)})
    .catch(error => {next(error)});
});

// PUT /api/products/:productId
Router.put('/products/:productId', (req, res, next) => {
    const productId = req.params.productId;

    productModel.updateOne({_id: productId}, {$set: {body: req.body.body}})
    .then(tw => {res.status(200).send("Produit bien modifié.")})
    .catch(error => {next(error)});
});

// DELETE /api/products/:productId
Router.delete('/products/:productId', (req, res, next) => {
    const id = req.params.productId;

    productModel.deleteOne({_id: id})
    .exec()
    .then(result => {res.status(202).send('Produit bien supprimé.')})
    .catch(error => {next(error)});
})

module.exports = Router;