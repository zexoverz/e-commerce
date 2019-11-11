const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const transactionSchema = new Schema({
    listProduct: [{
        type: Schema.Types.ObjectId,
        required: [true, "listProduct must be inputted"]
    }],
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, "userId must be inputted"]
    },
    totalCost: {
        type: Number,
        required: [true, "totalCost must be inputted"]
    }
})

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;