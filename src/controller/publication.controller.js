import publicationService from "../services/publication.service.js"

const create = async ( req, res ) => {
    try{

        const body = req.body
        const userId = req.userId
        
        const post = await publicationService.createService( body, userId );

        res.status(201).send( post )
        
    }catch(err){
        res.status(500).send( {message: err.message} )
    }
}

const findAll = async ( req, res ) => {
    try{

        const offset = req.offset
        const limit = req.limit
        const next = req.nextU
        const baseUrl = req.baseUrl

        const publications = await publicationService.findAllService(offset,limit,next,baseUrl)

        res.status(200).send( publications )
        
    }catch(err){
        res.status(500).send( { message: err.message } )
    }
}

const topPublication = async ( req, res ) => {
    try{
        const publication = await publicationService.topPublicationService()

        res.status(200).send( publication )

    }catch(err){
        res.status(500).send( { message: err.message } )
    }

}

const findById = async ( req, res ) =>{

    try{
        const { id } = req.params

        const publication = await publicationService.findByIdService(id)

        res.status(200).send( publication )

    }catch(err){
        res.status(500).send( { message: err.message } )
    }
}

const searchByTitle = async ( req, res ) => {
    try {

        const offset = req.offset
        const limit = req.limit
        const next = req.nextU
        const baseUrl = req.baseUrl
        const { title } = req.query

        const publications = await publicationService.searchByTitleService( offset, limit, next, baseUrl, title )

        res.status(200).send( publications )
        
    } catch (err) {
        res.status(500).send( { message: err.message } )
    }
}

const userPublications = async ( req, res ) =>{
    try {
        const offset = req.offset
        const limit = req.limit
        const next = req.nextU
        const baseUrl = req.baseUrl
        const id = req.userId

        const publications = await publicationService.userPublicationsService( offset, limit, next, baseUrl, id )

        res.status(200).send( publications )

    } catch (err) {
        res.status(500).send( { message: err.message } )
    }
}

const update = async ( req, res ) => {
    try {
        const { id } = req.params

        const body = req.body

        const userId = req.userId

        const response = await publicationService.updateService( id, body, userId )

        return res.status(200).send( response )

    } catch (err) {
        res.status(500).send( { message: err.message } )
    }
}

const erase = async ( req, res ) => {
    try {
        const { id } = req.params
        const userId = req.userId

        const response = await publicationService.eraseService( id, userId )

        return res.status(200).send( response )
        
    } catch (err) {
        res.status(500).send( { message: err.message } )
    }
}

const like = async ( req, res ) => {
    try {
        const { id } = req.params

        const userId = req.userId

        const response = await publicationService.likeService( id, userId )

        res.status(200).send( response )
        
    } catch (err) {
        res.status(500).send( { message: err.message } )
    }
}

const addComment = async ( req, res ) => {
    try {
        const { id } = req.params

        const userId = req.userId

        const body = req.body

        const response = await publicationService.addCommentService( id, userId, body )

        res.status(200).send( response )

    } catch (err) {
        res.status(500).send( { message: err.message } )
    }
}

const deleteComment = async ( req, res ) => {
    try {
        const { idPublication, idComment } = req.params

        const userId = req.userId

        const response = await publicationService.deleteCommentService( idPublication, idComment, userId )

        res.status(200).send( response )
        
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