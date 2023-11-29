import User from "../models/User.js" 

const createRepositore = ( name, username, email, password, avatar ) => User.create( 
    name, 
    username, 
    email, 
    password, 
    avatar 
)

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