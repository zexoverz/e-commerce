const routes = require("express").Router();
const ProductController = require("../controllers/product");
const authenticate = require("../middlewares/authenticate");
const authorization = require("../middlewares/authorization");


routes.get("/", ProductController.getAllProduct);
routes.use(authenticate);
routes.post("/", authorization, ProductController.createProduct);
routes.put("/:id", authorization, ProductController.updateProduct);
routes.delete("/:id", authorization, ProductController.deleteProduct);

module.exports = routes;