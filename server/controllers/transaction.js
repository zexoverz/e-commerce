const Transaction = require("../models/transaction");

class TransactionController {
    static getAllTransaction(req, res, next) {
        Transaction.find({
            userId: req.user.id
        }).then((transactions) => {
            res.status(200).json(transactions);
        }).catch(next)
    }

    static createTransaction(req, res, next) {

        Transaction.create({
            listProduct: req.body.listProduct,
            userId: req.user.id,
            totalCost: req.body.totalCost,
            status: req.body.status
        }).then(transactions => {
            res.status(201).json(transactions);
        }).catch(next);
    }

    static updateTransaction(req, res, next) {
        console.log(req.body.listProduct)
        Transaction.updateOne({
            _id: req.params.id
        }, {
            listProduct: req.body.listProduct,
            totalCost: req.body.totalCost,
        }).then(transaction => {
            res.status(200).json(transaction);
        }).catch(next);
    }

    static paidTransaction(req, res, next) {
        Transaction.updateOne({
            _id: req.params.id
        }, {
            status: "paid"
        }).then(result => {
            res.status(200).json(result);
        }).catch(next);
    }
}

module.exports = TransactionController;