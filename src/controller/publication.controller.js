import publicationService from "../services/publication.service.js"

const create = async ( req, res ) => {
    try{

        const { title, text } = req.body

        if( !title || !text ) {
            res.status(400).send( { message:"Submits all fields for create post" } )
        }

        const post = await publicationService.createService( { 
            title, 
            text, 
            user: req.userId
         } );

        if( !post ) {
            return res.status(400).send( { message: "Error creating post" } )
        }

        res.status(201).send( { 
            message: "Publication created successfully",
            post:{
                title,
                text
            } 
        } )
        

    }catch(err){
        res.status(500).send( {message: err.message} )
    }
}

const findAll = async ( req, res ) => {
    try{

        const offset = req.offset
        const limit = req.limit
        const next = req.nextU

        const total = await publicationService.countAllService()
        const currentUrl = req.baseUrl

        const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null

        const previous = offset - limit < 0 ? null : offset - limit

        const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null

        const publications = await publicationService.findAllService( offset, limit )
        
        if( publications.length === 0 ) {
            return res.status(400).send( { message: "There are no created publications" } )
        }

        res.status(200).send( {
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,
            results: publications.map( item => ( {
                id : item._id,
                title: item.title,
                text: item.text,
                likes: item.likes,
                comments: item.comments,
                date: item.date,
                name: item.user.name,
                username: item.user.username,
                avatar: item.user.avatar,
            } ) )
        } )
        
    }catch(err){
        res.status(500).send( { message: err.message } )
    }
}

const topPublication = async ( req, res ) => {
    try{
        const publications = await publicationService.topService()

        if(!publications){
            return res.status(400).send( { message: "There is no registered publication" } )
        }

        res.status(200).send( { 
            publication: {
                id : publications._id,
                title: publications.title,
                text: publications.text,
                likes: publications.likes,
                comments: publications.comments,
                date: publications.date,
                name: publications.user.name,
                username: publications.user.username,
                avatar: publications.user.avatar,
            }
        } )

    }catch(err){
        res.status(500).send( { message: err.message } )
    }

}

const findById = async ( req, res ) =>{

    try{
        const { id } = req.params

        if( !id ){
            return res.status(400).send( { message: "id not submited" } )
        }

        const publication = await publicationService.findByIdService(id)

        if( !publication ){
            return res.status(400).send( { message: "this publication does not exist" } )
        }

        res.status(200).send( { 
            id : publication._id,
            title: publication.title,
            text: publication.text,
            likes: publication.likes,
            comments: publication.comments,
            date: publication.date,
            name: publication.user.name,
            username: publication.user.username,
            avatar: publication.user.avatar,
        } )

    }catch(err){
        res.status(500).send( { message: err.message } )
    }
}

const searchByTitle = async ( req, res ) => {

    try {

        const offset = req.offset
        const limit = req.limit
        const next = req.nextU

        const { title } = req.query

        if( !title ){
            return res.status(400).send( { message: "title not submited" } )
        }

        const publications = await publicationService.searchByTitleService( title, offset, limit )
        const total = await publicationService.countByTitleService(title)
        const currentUrl = req.baseUrl

        const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null

        const previous = offset - limit < 0 ? null : offset - limit

        const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null

        if( publications.length === 0 ){

            return res.status(400).send( { message: "There are not publication with this title" } )
        }

        res.status(200).send( { 
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,
            results: publications.map( (item) => ({
                id : item._id,
                title: item.title,
                text: item.text,
                likes: item.likes,
                comments: item.comments,
                date: item.date,
                name: item.user.name,
                username: item.user.username,
                avatar: item.user.avatar,
            }))
        } )
        
    } catch (err) {
        res.status(500).send( { message: err.message } )
    }
}

const userPublications = async ( req, res ) =>{

    try {

        const offset = req.offset
        const limit = req.limit
        const next = req.nextU

        const id = req.userId

        const publications = await publicationService.userPublicationsService( id, offset, limit )
        const total = await publicationService.countByIdService(id)
        const currentUrl = req.baseUrl

        const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null

        const previous = offset - limit < 0 ? null : offset - limit

        const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null

        if( publications.length === 0 ){
            return res.status(400).send( { message: "There are no posts for this user" } )
        }

        res.status(200).send( { 
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,
            results: publications.map( (item) => ({
                id : item._id,
                title: item.title,
                text: item.text,
                likes: item.likes,
                comments: item.comments,
                date: item.date,
                name: item.user.name,
                username: item.user.username,
                avatar: item.user.avatar,
            }))
        } )


    } catch (err) {
        res.status(500).send( { message: err.message } )
    }
}

const update = async ( req, res ) => {

    try {
        const { id } = req.params

        const { title, text } = req.body

        if( !title && !text ){
            return res.status(400).send( { message: "Submit at least one field to the update the post" } )
        }

        const publication = await publicationService.findByIdService(id)

        if( publication.user._id != req.userId ){
            return res.status(400).send( { message: "you didn't update this post" } )
        }

        await publicationService.updateService( id, title, text )

        return res.status(200).send( { message: "post updated successfully" } )

    } catch (err) {
        res.status(500).send( { message: err.message } )
    }
}

const erase = async ( req, res ) => {

    try {
        
        const { id } = req.params

        const publication = await publicationService.findByIdService(id)

        if( publication.user._id != req.userId ){
            return res.status(400).send( { message: "you didn't delete this post" } )
        }

        await publicationService.eraseService(id)

        return res.status(200).send( { message: "post deleted successfully" } )
        
    } catch (err) {
        res.status(500).send( { message: err.message } )
    }
}

const like = async ( req, res ) => {
    try {
        const { id } = req.params

        const userId = req.userId

        const publicationLike = await publicationService.likeService( id, userId )

        if(!publicationLike){
            await publicationService.deleteLikeService( id, userId )
            return res.status(200).send( { message: "like removed" } )
        }

        res.status(200).send( { message: "Like done sucessfully" } )
    } catch (err) {
        res.status(500).send( { message: err.message } )
    }
}

const addComment = async ( req, res ) => {
    try {

        const { id } = req.params

        const userId = req.userId

        const { commentBody } = req.body
        
        if(!commentBody){
            return res.status(200).send( { message: "write a message to comment" } )
        }

        await publicationService.addCommentService( id, userId, commentBody )

        res.status(200).send( { message: "Comment sucessfully created" } )

    } catch (err) {
        res.status(500).send( { message: err.message } )
    }
}

const deleteComment = async ( req, res ) => {
    try {
        const { idPublication, idComment } = req.params

        const userId = req.userId

        const commentDeleted = await publicationService.deleteCommentService( idPublication, idComment, userId )

        const commentFinder = commentDeleted.comments.find( (comment) => comment.idComment === idComment)

        if(!commentFinder){
            return res.status(404).send( { message: "Comment not found" } )
        }

        if( commentFinder.userId != userId ){
            return res.status(400).send( { message: "You can't delete this comment" } )
        }

        res.status(200).send( { message: "Comment sucessfully removed" } )
    } catch (err) {
        res.status(500).send( { message: err.message } )
    }
}

export default { 
    create, 
    findAll, 
    topPublication, 
    findById, 
    searchByTitle,
    userPublications,
    update,
    erase,
    like,
    addComment,
    deleteComment
}