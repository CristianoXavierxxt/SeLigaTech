import User from "../models/User.js" 

const createRepositore = ( body ) => User.create( body )

const findByEmailRepositore = (email) => User.findOne( 
    { email: email } 
)

const findAllRepositore = () => User.find()

const findByIdRepositore = (id) => User.findById(id)

const updateUserRepositore = ( 
    id, 
    name, 
    username, 
    email, 
    password, 
    avatar ) => 
    User.findOneAndUpdate( 
        { _id: id }, 
        { name, username, email, password, avatar } 
    )

export default  { 
    createRepositore,
    findByEmailRepositore, 
    findAllRepositore, 
    findByIdRepositore, 
    updateUserRepositore 
}