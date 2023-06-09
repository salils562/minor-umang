const mongoose=require('mongoose');

mongoose.login=mongoose.createConnection("mongodb:://localhost:27017/maheshData");

module.exports=mongoose;