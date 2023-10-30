import publicationService from "../services/publication.service.js"

const create = async ( req, res ) => {
    try{

        const { title, text, banner } = req.body

        if( !title || !text || !banner ) {
            res.status(400).send( { message:"Submits all fields for create post" } )
        }

        const post = await publicationService.createService( { title, text, banner, 
            user:{ _id:"653d419ff5151d4361ee37ad" } } );

        if( !post ) {
            return res.status(400).send( { message: "Error creating post" } )
        }

        res.status(201).send( { 
            message: "Post created successfully",
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
        const posts = await publicationService.findAllService();
        
        if( posts.length === 0 ) {
            return res.status(400).send( { message: "There are no created posts" } )
        }

        res.status(200).send(posts)
        
    }catch(err){
        res.status(500).send( {message: err.message} )
    }
}

export default { create, findAll }