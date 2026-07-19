const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({

    orderId: {
        type: Number
    },
    status: {
        type: String
    }

},
    {
        timestamps: true
    })

const paymentSchema = mongoose.model('Payment', paymentSchema);

module.exports = paymentSchema