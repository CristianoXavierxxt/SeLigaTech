import Publication from "../models/Publication.js"

const createService = (body) => Publication.create(body)

const findAllService = ( offset, limit ) => Publication.find().sort( { _id: -1 } ).skip( offset ).limit( limit ).populate("user")

const countAllService = () => Publication.countDocuments()

const topService = () => Publication.findOne().sort( { _id: -1 } ).populate("user")

const findByIdService = (id) => Publication.findById(id).populate("user")

const searchByTitleService = (title) => Publication.find( { 
    title: { 
        $regex: `${title || ""}`, 
        $options: "i" }
 } ).sort( { _id: -1 } ).populate("user")

export default { 
    createService, 
    findAllService, 
    countAllService, 
    topService, 
    findByIdService,
    searchByTitleService
 }