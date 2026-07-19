const express = require('express');
const { userAuth } = require('../middleware/auth');
const instance = require('../utils/razorpay');
const Payment = require("../models/paymnet")

const paymentRouter = express.Router();

paymentRouter.post('payments/create', userAuth , async (req,resp)=>{
    try{
        instance.orders.create({
            "amount":50000, // THIS IS PAISA
            "currency":"INR",
            "receipt":"",
            "partial_payment":false,
            "notes":{
                "firstName":"value1",
                "lastName":"value2"
            }
        })

        const payment = new Payment({
            orderId:order.id,
            status:order.status
        })


       const savedPayment = await payment.save();

        res.Json({order})

    }
    catch{
        console.log("Caught error while creating the payment")
    }
})