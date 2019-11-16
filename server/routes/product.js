const routes = require("express").Router();
const ProductController = require("../controllers/product");
const authenticate = require("../middlewares/authenticate");
const authorization = require("../middlewares/authorization");
const {
    multer,
    sendUploadToGCS
} = require('../middlewares/uploader')


routes.get("/", ProductController.getAllProduct);
routes.use(authenticate);
routes.post("/", authorization, multer.single("img"), sendUploadToGCS, ProductController.createProduct);
routes.put("/:id", ProductController.updateProduct);
routes.delete("/:id", authorization, ProductController.deleteProduct);

module.exports = routes;