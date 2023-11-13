import Publication from "../models/Publication.js"

const createService = (body) => Publication.create(body)


const findAllService = ( offset, limit ) => Publication.find().sort( { _id: -1 } )
.skip( offset )
.limit( limit )
.populate("user")


const countAllService = () => Publication.countDocuments()

const topService = () => Publication.findOne().sort( { _id: -1 } ).populate("user")

const findByIdService = (id) => Publication.findById(id).populate("user")



const countByTitleService = (title) => Publication.find({ 
    title: { 
        $regex: `${title || ""}`, 
        $options: "i" }
}).count()

const searchByTitleService = ( title, offset, limit ) => Publication.find( { 
    title: { 
        $regex: `${title || ""}`, 
        $options: "i" }
} ).sort( { _id: -1 } )
.skip( offset )
.limit( limit )
.populate("user")



const countByIdService = (id) => Publication.find( { user: id } ).count()

const userPublicationsService = ( id, offset, limit ) => Publication.find( { user: id } )
.sort( { _id: -1 } )
.skip( offset )
.limit( limit )
.populate("user")


const updateService = (id, title, text, banner) => 
Publication.findOneAndUpdate( 
    { _id: id }, 
    { title, text, banner }, 
    { rawResult: true } 
)

const eraseService = (id) => Publication.findByIdAndDelete( { _id: id } )

export default { 
    createService, 
    findAllService, 
    countAllService,
    countByTitleService,
    countByIdService, 
    topService, 
    findByIdService,
    searchByTitleService,
    userPublicationsService,
    updateService,
    eraseService
 }