import mongoose from "mongoose"

const connectDatabase = () =>{
    console.log( "Wait connect to the database" )

    mongoose.connect( process.env.MONGO_DB_URI )
    .then( ()=> console.log( "MongoDB Atlas connected" ) )
    .catch( (error) => console.log(error) )
}

export default connectDatabase;