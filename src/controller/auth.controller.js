import bcrypt from "bcrypt" 
import authService from "../services/auth.service.js"

const login = async ( req, res ) => {

    try{
        const { email, password } = req.body

        const user = await authService.findUser( email )

        if( !user ){
            return res.status(404).send( { message: "Email or password incorrect" } )
        }

        const passwordIsValued = await bcrypt.compare( password, user.password )

        if( !passwordIsValued ) {
            return res.status(404).send( { message: "Email or password incorrect" } )
        }

        const token = authService.generateToken( user.id )

        res.status(200).send( { token } )

    }catch(err){
        res.status(500).send( err.message )
    }
}

export { login }