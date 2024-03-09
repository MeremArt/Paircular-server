// installed packages
const {Schema, model} = require('mongoose');

const paymentSchema = new Schema({
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    reference: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const paymentModel = model('PaymentModel', paymentSchema);

module.exports = paymentModel;