import { Router } from "express" 
import userController from "../controller/user.controller.js" 
import userMiddlewares from "../middlewares/global.middleware.js" 

const router = Router()

router.post( "/", userController.create )
router.get( "/", userController.findAll )
router.get( "/:id", userMiddlewares.validId, userMiddlewares.validUser, userController.findById )  
router.patch( "/:id", userMiddlewares.validId, userMiddlewares.validUser, userController.updateUser )

export default router; 