const { Schema, model } = require("mongoose");
const Product = new Schema(
    {
        invoice_date: {
            type: Date,
            required: true,

        },
        product_name: {
            type: String,
            required: true,
        },
        product_price: {
            type: Number,
            required: true,
        },
        product_quantity: {
            type: Number,
            required: true
        }


    },
    { timestamps: true }
)

module.exports = model("Product", Product)