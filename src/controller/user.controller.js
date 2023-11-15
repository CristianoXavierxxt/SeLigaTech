import userService from "../services/user.service.js" 

const create = async ( req, res ) => {
    try{
        const { name, username, email, password, avatar } = req.body

        if( !name || !username || !email || !password || !avatar ) {
            res.status(400).send( { message:"Submits all fields for registration" } )
        }

        const user = await userService.createService( req.body );

        if( !user ) {
            return res.status(400).send( { message: "Error creating user" } )
        }

        res.status(201).send( { 
            message: "User created successfully",
            user:{
                name,
                username,
                email,
                avatar
            } 
        } )
    }catch(err){
        res.status(500).send( {message: err.message} )
    }
};

const findAll = async ( req, res ) => {
    try{
        const users = await userService.findAllService();
        
        if( users.length === 0 ) {
            return res.status(400).send( { message: "There are no registered users" } )
        }

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
        const { id } = req.id;

        const { name, username, email, password, avatar } = req.body

        if( !name && !username &&  !email &&  !password && !avatar ) {
            res.status(400).send( { message:"Submits at least one field for update" } )
        }

        await userService.updateUserService( 
            id,
            name,
            username,
            email,
            password,
            avatar
        )

        res.status(200).send( { message: "User successfully update" } )
    }catch(err){
        res.status(500).send( {message: err.message} )
    }
}

export default { create, findAll, findById, updateUser }