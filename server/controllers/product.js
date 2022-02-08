const Product = require("../models/product");

class ProductController {
    static getAllProduct(req, res, next) {
        Product.find()
            .then((products) => {
                res.status(200).json(products);
            })
            .catch(next);
    }

    static createProduct(req, res, next) {
        Product.create({
            name: req.body.name,
            price: req.body.price,
            img: req.body.img,
            stock: req.body.stock
        }).then((product) => {
            res.status(201).json(product);
        }).catch(next);

    }

    static updateProduct(req, res, next) {
        Product.updateOne({
            _id: req.params.id
        }, {
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            img: req.body.img,
        }).then((result) => {
            res.status(200).json(result);
        }).catch(next);
    }


    static deleteProduct(req, res, next) {
        Product.deleteOne({
            _id: req.params.id
        }).then((result) => {
            res.status(200).json(result);
        }).catch(next);
    }

}

module.exports = ProductController;