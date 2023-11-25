import Publication from "../models/Publication.js"

const createRepositore = (body) => Publication.create(body)


const findAllRepositore = ( offset, limit ) => Publication.find().sort( { _id: -1 } ).skip( offset ).limit( limit ).populate("user")


const countAllRepositore = () => Publication.countDocuments()

const topRepositore = () => Publication.findOne().sort( { _id: -1 } ).populate("user")

const findByIdRepositore = (id) => Publication.findById(id).populate("user")



const countByTitleRepositore = (title) => Publication.find({ 
    title: { 
        $regex: `${title || ""}`, 
        $options: "i" }
}).count()

const searchByTitleRepositore = ( title, offset, limit ) => Publication.find( { 
    title: { 
        $regex: `${title || ""}`, 
        $options: "i" }
} ).sort( { _id: -1 } )
.skip( offset )
.limit( limit )
.populate("user")



const countByIdRepositore = (id) => Publication.find( { user: id } ).count()

const userPublicationsRepositore = ( id, offset, limit ) => Publication.find( { user: id } )
.sort( { _id: -1 } )
.skip( offset )
.limit( limit )
.populate("user")


const updateRepositore = (id, title, text) => 
Publication.findOneAndUpdate( 
    { _id: id }, 
    { title, text }, 
    { rawResult: true } 
)

const eraseRepositore = (id) => Publication.findByIdAndDelete( { _id: id } )

const likeRepositore = ( idNews, userId ) => Publication.findOneAndUpdate( 
    { _id: idNews,"likes.userId": { $nin:[userId] } }, 
    { $push: { likes: { userId, created: new Date() } } }
)

const deleteLikeRepositore = ( idNews, userId ) => Publication.findOneAndUpdate(
    { _id: idNews},
    { $pull: { likes: { userId } } }
)

const addCommentRepositore = ( idPublication, userId, commentBody ) => {
    const idComment = Math.floor( Date.now() * Math.random() ).toString(36)

    return Publication.findOneAndUpdate(
        { _id: idPublication },
        { $push: { comments: { idComment, userId, commentBody, createdAt: new Date() } } }
    )
}

const deleteCommentRepositore = ( idPublication, idComment, userId ) => Publication.findOneAndUpdate(
    { _id: idPublication },
    { $pull: { comments: { idComment, userId } } },
)

export default { 
    createRepositore, 
    findAllRepositore, 
    countAllRepositore,
    countByTitleRepositore,
    countByIdRepositore, 
    topRepositore, 
    findByIdRepositore,
    searchByTitleRepositore,
    userPublicationsRepositore,
    updateRepositore,
    eraseRepositore,
    likeRepositore,
    deleteLikeRepositore,
    addCommentRepositore,
    deleteCommentRepositore
}