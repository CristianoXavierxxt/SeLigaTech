import userService from "../services/user.service.js" 

const createUser = async ( req, res ) => {
    try{
        const body = req.body

        const user = await userService.createUserService( body );

        res.status(201).send( { 
            message: "User created successfully",
            user:{
                name: user.user.name,
                username: user.user.username,
                email: user.user.email,
                avatar: user.user.avatar
            } 
        } )
    }catch(err){
        res.status(500).send( {message: err.message} )
    }
};

const findAll = async ( req, res ) => {
    try{
        const users = await userService.findAllService();

        res.status(200).send(users)

    }catch(err){
        res.status(500).send( {message: err.message} )
    }

}

const findById = async ( req , res ) => {
    try{
        const user = req.user

        res.status(200).send( user )
    }catch(err){
        res.status(500).send( {message: err.message} )
    }
}

const updateUser = async ( req, res ) => {

    try{
        const id = req.id

        const body = req.body

        const response = await userService.updateUserSercice( id, body )

        res.status(200).send( response )
    }catch(err){
        res.status(500).send( {message: err.message} )
    }
}

export default { createUser, findAll, findById, updateUser }