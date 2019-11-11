const routes = require('express').Router();
const userRouter = require('./user');
const productRouter = require("./product");


routes.use('/user', userRouter)
routes.use('/product', productRouter)



module.exports = routes