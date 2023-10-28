import express from "express" 
import userController from "../controller/user.controller.js" 
import userMiddlewares from "../middlewares/global.middleware.js" 

const route = express.Router()

route.post( "/", userController.create )
route.get( "/", userController.findAll )
route.get( "/:id", userMiddlewares.validId, userMiddlewares.validUser, userController.findById )  
route.patch( "/:id", userMiddlewares.validId, userMiddlewares.validUser, userController.updateUser )

export default route; 