import publicationService from "../services/publication.service.js"

const create = async ( req, res ) => {
    try{

        const { title, text, banner } = req.body

        if( !title || !text || !banner ) {
            res.status(400).send( { message:"Submits all fields for create post" } )
        }

        const post = await publicationService.createService( { 
            title, 
            text, 
            banner, 
            user: req.userId
         } );

        if( !post ) {
            return res.status(400).send( { message: "Error creating post" } )
        }

        res.status(201).send( { 
            message: "Publication created successfully",
            post:{
                title,
                text,
                banner
            } 
        } )
        

    }catch(err){
        res.status(500).send( {message: err.message} )
    }
}

const findAll = async ( req, res ) => {
    try{
        let { limit, offset } = req.query
        
        limit = Number( limit )
        offset = Number( offset )

        if( !limit ){
            limit = 5
        }

        if( !offset ){
            offset = 0
        }

        const publications = await publicationService.findAllService( offset, limit );
        const total = await publicationService.countAllService()
        const currentUrl = req.baseUrl

        const next = offset + limit

        const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

        const previous = offset - limit < 0 ? null : offset - limit;

        const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;
        
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
                banner: item.banner,
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
                banner: publications.banner,
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
            banner: publication.banner,
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
        const { title } = req.query

        if( !title ){
            return res.status(400).send( { message: "title not submited" } )
        }

        const publications = await publicationService.searchByTitleService(title)

        if( publications.length === 0 ){

            return res.status(400).send( { message: "There are not publication with this title" } )
        }

        res.status(200).send( { 
            results: publications.map((item) => ({
                id : item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
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

export default { 
    create, 
    findAll, 
    topPublication, 
    findById, 
    searchByTitle 
}