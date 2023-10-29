import User from "../models/User.js" 

const createService = (body) => User.create(body)

const findAllService = () => User.find()

const findByIdService = (id) => User.findById(id)

const updateUserService = ( id, name, username, email, password, avatar ) => User.findOneAndUpdate( 
        { _id: id }, 
        { name, username, email, password, avatar } 
    )

export default  { 
    createService, 
    findAllService, 
    findByIdService, 
    updateUserService 
}