const mongoose = require('mongoose');
const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: {
            values: ['ignored', 'interested','accepted', 'rejected'],
            message: 'Status must be either ignored, accepted, or rejected'
        },
        required: true
    }
});

connectionRequestSchema.pre("save", function (next) {
  connectionRequest = this
 if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    console.log("$$$$$$$$$$$$PRE$$$$$$$$$$4")
    throw new Error("You can't create a connection with yourself");
}

next();

})

const ConnectionRequest = mongoose.model('ConnectionRequest', connectionRequestSchema);
module.exports = ConnectionRequest;