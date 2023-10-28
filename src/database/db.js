import mongoose from "mongoose"

const connectDatabase = () =>{
    console.log( "Wait connect to the database" )

    mongoose.connect( 
        process.env.MONGO_DB_URI, 
        { useNewUrlParser : true, useUnifiedTopology: true } 
    )
    .then( ()=> console.log( "MongoDB Atlas connected" ) )
    .catch( (error) => console.log(error) )
}

export default connectDatabase;