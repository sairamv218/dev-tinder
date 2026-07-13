const express = require('express');
const { userAuth } = require('../middleware/auth'); 
const ConnectionRequest  = require('../models/connectionRequest')
const User = require('../models/user')
const requestsRouter = express.Router();

requestsRouter.post('/requests/send', userAuth, async (req, res) => {
 try{

    const allowedStatus = ['ignored','interested'];
    if(!(allowedStatus.includes(req.body.status))){
        throw new Error("Status is not matching as per the policy")
    }

    const connectionRequest = new ConnectionRequest({
    fromUserId : req.user._id,
    toUserId: req.body.toUserId,
    status: req.body.status
   })

    const toUserPresent = await User.findById(req.body.toUserId)
//    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
//     throw new Error("You can't create a connection with yourself");
// }

    if(!toUserPresent){
        throw new Error("To user not found,Please check the userid")
    }
    
    const existingConnectionRequst = await ConnectionRequest.findOne({
        $or : [
            {fromUserId:connectionRequest.fromUserId ,toUserId:connectionRequest.toUserId },
            {fromUserId:connectionRequest.toUserId ,toUserId:connectionRequest.fromUserId }
        ]
    })

    if(existingConnectionRequst){
        throw new Error("Connection request already exists")
    }

   await connectionRequest.save()
   res.status(200).send("Connection requested succesfully")
 }
 catch(err){
    res.status(500).send({ error: err.message, message: 'Internal Server Error' });
 }
})



module.exports = {requestsRouter};