const mongoose = require('mongoose');

console.log("Connecting to MongoDB...")

const url  = "mongodb+srv://sairamv:vs%40225588@atomix.t6zeuhl.mongodb.net/devTinder";

const connectDB = async () => {
    await mongoose.connect(url)
}
    
module.exports = {connectDB};


