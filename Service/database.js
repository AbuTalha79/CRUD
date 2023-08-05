const mongoose = require('mongoose')

const connectDB = async()=>{
    mongoose.connect(process.env.MONGO_URI,{

    }).then(()=>{
        console.log("Database connected");
    }).catch((error)=>{
        console.log("Database not coonected " + error);
    })
}

module.exports = connectDB