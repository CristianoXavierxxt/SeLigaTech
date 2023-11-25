import bcrypt from "bcrypt" 
import authRepositore from "../repositores/auth.repositores.js"

const loginService = async ( email, password ) => {

    const user = await authRepositore.findUser( email )

    if( !user ) throw new Error( "Email or password incorrect" )
   
    const passwordIsValued = await bcrypt.compare( password, user.password )

    if( !passwordIsValued ) throw new Error( "Email or password incorrect" )

    const token = authRepositore.generateToken( user.id )

    return { token } 

}

export default { loginService }