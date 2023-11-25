import dotenv from "dotenv"
import JsonWebToken from "jsonwebtoken"
import userRepositori from "../repositores/user.repositores.js"
dotenv.config()

const validToken = async ( req, res, next ) => {
    try {
        
        const { authorization } = req.headers

        if( !authorization ) {
            return res.status(401).send( { message: "token invalid" } )
        }

        const parts = authorization.split(" ")

        if( parts.length !== 2 ){
            return res.status(401).send( { message: "token invalid" } )
        }

        const [ schema, token ] = parts

        if( schema !== "Bearer" || !token  ){
            return res.status(401).send( { message: "token invalid" } )
        }

        JsonWebToken.verify( token, process.env.SECRET_JWT, async ( error, decoded ) => {
            if(error){
                return res.status(401).send( { message: "token invalid" } )
            }

            const user = await userRepositori.findByIdRepositore( decoded.id )

            if( !user || !user.id ){
                return res.status(401).send( { message: "token invalid" } )
            }

            req.userId = user._id

            return next()
        } )


    } catch (err) {
        res.status(500).send( { message: err.message } )
    }
}

export default { validToken }