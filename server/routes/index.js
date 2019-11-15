const routes = require('express').Router();
const userRouter = require('./user');
const productRouter = require("./product");
const transactionRouter = require("./transaction");


routes.use('/user', userRouter)
routes.use('/product', productRouter)
routes.use('/transaction', transactionRouter)



module.exports = routes