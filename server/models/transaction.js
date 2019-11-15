const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const transactionSchema = new Schema({
    listProduct: [{
        name: String,
        typeProduct: String,
        price: Number,
        img: String,
        quantity: Number,
        total: Number
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    totalCost: {
        type: Number,
        required: [true, "totalCost must be inputted"]
    },
    status: String
})

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;