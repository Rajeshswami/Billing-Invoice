const { Schema, model } = require("mongoose");
const CustomerSchema = new Schema(
    {
        customer_name: {
            type: String,
            required: true,
        },
        phone_number: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

module.exports = model("customer_details", CustomerSchema)