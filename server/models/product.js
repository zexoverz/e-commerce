const mongoose = require("mongoose");
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "name must be inputted"]
    },
    stock: {
        type: Number,
        required: [true, "stock must be inputted"]
    },
    price: {
        type: Number,
        required: [true, "price must be inputted"]
    },
    img: {
        type: String,
        required: [true, "img must be inputted"]
    }
})

const Product = mongoose.model("Product", productSchema)
module.exports = Product;