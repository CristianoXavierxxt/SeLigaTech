import mongoose from "mongoose"

const connectDatabase = () =>{
    console.log( "Wait connect to the database" )

    mongoose.connect( 
        "mongodb+srv://root:mejEIgaf6kvCOGHi@cluster0.sebgjxr.mongodb.net/?retryWrites=true&w=majority", 
        { useNewUrlParser : true, useUnifiedTopology: true } 
    )
    .then( ()=> console.log( "MongoDB Atlas connected" ) )
    .catch( (error) => console.log(error) )
}

export default connectDatabase;