import { Router } from "express" 
import userController from "../controller/user.controller.js" 
import userMiddlewares from "../middlewares/global.middleware.js" 
import authMiddleware from "../middlewares/auth.middlewares.js"

const router = Router()

router.post( "/createUser", userController.createUser )
router.get( "/getAllUsers", authMiddleware.validToken, userController.findAll )

router.get( "/findByIdUser/:id?", 
authMiddleware.validToken, 
userMiddlewares.validId, 
userController.findById 
)  

router.patch( "/updateUser/:id", 
authMiddleware.validToken, 
userMiddlewares.validId, 
userMiddlewares.validUser, 
userController.updateUser 
)

export default router; 