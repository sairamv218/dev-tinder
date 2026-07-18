const mongoose = require('mongoose');

console.log("Connecting to MongoDB...")

const url  = process.env.DB_CONNECTION_SECRET;

const connectDB = async () => {
    await mongoose.connect(url)
}
    
module.exports = {connectDB};


