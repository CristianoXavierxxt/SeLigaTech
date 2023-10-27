const mongoose = require( "mongoose" )

const UserSchemma = new mongoose.Schema({
    name: {
        type : String,
        required: true
    },
    username: {
        type : String,
        required: true
    },
    email: {
        type : String,
        required: true,
        unique: true
    },
    password: {
        type : String,
        required: true
    },
    avatar: {
        type : String,
        required: true
    }
})

const User = mongoose.model( "User", UserSchemma )

module.exports = User;