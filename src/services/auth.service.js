import User from "../models/User.js" 

const findUser = (email) => User.findOne( { email: email } ).select( "+password" )

export { findUser }