import authService from "../services/auth.service.js"

const login = async ( req, res ) => {

    try{
        const { email, password } = req.body

        const token = await authService.loginService( email, password )

        res.status(200).send( token )

    }catch(err){
        res.status(500).send( err.message )
    }
}

export { login }