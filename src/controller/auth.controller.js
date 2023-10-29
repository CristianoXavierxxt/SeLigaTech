import bcrypt from "bcrypt" 
import { findUser } from "../services/auth.service.js"

const login = async ( req, res ) => {

    try{
        const { email, password } = req.body

        const user = await findUser( email )

        if( !user ){
            return res.status(404).send( { message: "Email or password incorrect" } )
        }

        const passwordIsValued = await bcrypt.compare( password, user.password )

        if( !passwordIsValued ) {
            return res.status(404).send( { message: "Email or password incorrect" } )
        }

        res.status(200).send( { message: "Login successfully" } )

    }catch(err){
        res.status(500).send( err.message )
    }
}

export { login }