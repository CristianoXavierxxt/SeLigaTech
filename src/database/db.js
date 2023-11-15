import mongoose from "mongoose"

function connectDatabase() {
    mongoose.connect( process.env.MONGO_DB_URI )
    .then( ()=> console.log( "MongoDB Atlas connected" ) )
    .catch( (error) => console.log(error) )
}

export default connectDatabase;