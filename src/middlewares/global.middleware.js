import mongoose from "mongoose" 
import userRepositores from "../repositores/user.repositores.js" 

const validId = ( req , res, next ) => {
    try{
        let idParam;
        if (!req.params.id) {
            req.params.id = req.userId;
            idParam = req.params.id;
        } else {
            idParam = req.params.id;
        }

        if( !mongoose.Types.ObjectId.isValid(idParam) ){
            return res.status(400).send( { message: "Invalid id" } )
        }

        return next()
        
    }catch(err){
        res.status(500).send( { message: err.message } )
    }
}

const pagination = ( req, res, next ) => {

    try {

        let { limit, offset } = req.query
        
        limit = Number( limit )
        offset = Number( offset )

        if( !limit ){
            limit = 5
        }

        if( !offset ){
            offset = 0
        }

        const nextU = offset + limit

        req.limit = limit
        req.offset = offset
        req.nextU = nextU

        return next()

    } catch (err) {
        res.status(500).send( { message: err.message } )
    }
}

export default { validId, pagination }