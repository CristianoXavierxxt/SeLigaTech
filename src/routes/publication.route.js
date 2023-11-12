import { Router } from "express"
import publicationController from "../controller/publication.controller.js" 
import authMiddleware from "../middlewares/auth.middlewares.js"


const router = Router()


router.post( "/", authMiddleware.validToken, publicationController.create )
router.get( "/", publicationController.findAll )
router.get( "/top", publicationController.topPublication )
router.get( "/search", publicationController.searchByTitle )

router.get( "/:id", authMiddleware.validToken, publicationController.findById )

export default router