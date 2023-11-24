import { Router } from "express" 
import userController from "../controller/user.controller.js" 
import userMiddlewares from "../middlewares/global.middleware.js" 

const router = Router()

router.post( "/createUser", userController.create )
router.get( "/getAllUsers", userController.findAll )
router.get( "/findByIdUser/:id", userMiddlewares.validId, userMiddlewares.validUser, userController.findById )  
router.patch( "/updateUser/:id", userMiddlewares.validId, userMiddlewares.validUser, userController.updateUser )

export default router; 