import express from "express"
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()
import connectDatabase from "./database/db.js"


import userRoute from "./routes/user.route.js"
import authRoute from "./routes/auth.route.js"
import publicationRoute from "./routes/publication.route.js"


const app = express()
const port = process.env.PORT || 3000

connectDatabase()
app.use(cors({ 
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  }));
app.use(express.json())
app.use( "/user", userRoute )
app.use( "/auth", authRoute )
app.use( "/publication", publicationRoute )


app.listen( port, () => console.log( `Servidor rodando na porta ${port}` ) )