import User from "../models/User.js" 
import JsonWebToken from "jsonwebtoken"

const findUser = (email) => User.findOne( { email: email } ).select( "+password" )

const generateToken = (id) => JsonWebToken.sign( { id: id }, process.env.SECRET_JWT, { expiresIn: 86400 } )


export default { findUser, generateToken }