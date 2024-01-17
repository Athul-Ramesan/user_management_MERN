const mongoose = require('mongoose')

const userSchema =new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String
    },
    createdAt:{
        type: String
    }
})

const userModel = mongoose.model("user", userSchema);
module.exports= userModel