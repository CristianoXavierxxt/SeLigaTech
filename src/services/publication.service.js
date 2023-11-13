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

const likeService = ( idNews, userId ) => Publication.findOneAndUpdate( 
    { _id: idNews,"likes.userId": { $nin:[userId] } }, 
    { $push: { likes: { userId, created: new Date() } } }
)

const deleteLikeService = ( idNews, userId ) => Publication.findOneAndDelete(
    { _id: idNews},
    { $pull: { likes: { userId } } }
)

const addCommentService = ( idPublication, userId, commentBody ) => {
    const idComment = Math.floor( Date.now() * Math.random() ).toString(36)

    return Publication.findOneAndUpdate(
        { _id: idPublication },
        { $push: { comments: { idComment, userId, commentBody, createdAt: new Date() } } }
    )
}

const deleteCommentService = ( idPublication, idComment, userId ) => Publication.findOneAndDelete(
    { _id: idPublication },
    { $pull: { comments: { idComment, userId } } }
)

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
    eraseService,
    likeService,
    deleteLikeService,
    addCommentService,
    deleteCommentService
 }