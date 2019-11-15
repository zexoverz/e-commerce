const routes = require("express").Router();
const TransactionController = require("../controllers/transaction");
const authenticate = require("../middlewares/authenticate");


routes.use(authenticate);
routes.get("/", TransactionController.getAllTransaction);
routes.post("/", TransactionController.createTransaction);
routes.put("/:id", TransactionController.updateTransaction);
routes.patch("/:id", TransactionController.paidTransaction);

module.exports = routes;