const userService = require( "../services/user.sercice" )

const create = async ( req, res ) => {
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
            id: user._id,
            name,
            username,
            email,
            avatar
        } 
    } )
};

const findAll = async ( req, res ) => {
    const users = await userService.findAllService();
    
    if( users.length === 0 ) {
        return res.status(400).send( { message: "There are no registered users" } )
    }

    res.status(200).send(users)
}

const findById = async ( req , res ) => {
    const user = req.user

    res.status(200).send( user )
}

const updateUser = async ( req, res ) => {

    const { id, user } = req;

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
}

module.exports = { create, findAll, findById, updateUser }