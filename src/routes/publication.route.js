import { Router } from "express"
import publicationController from "../controller/publication.controller.js" 
import authMiddleware from "../middlewares/auth.middlewares.js"
import globalMiddleware from "../middlewares/global.middleware.js"


const router = Router()


router.post( "/", authMiddleware.validToken, publicationController.create )
router.get( "/", globalMiddleware.pagination, publicationController.findAll )
router.get( "/top", publicationController.topPublication )
router.get( "/search", globalMiddleware.pagination, publicationController.searchByTitle )
router.get( "/byUser", authMiddleware.validToken, globalMiddleware.pagination,
publicationController.userPublications )
router.delete( "/:id", authMiddleware.validToken, publicationController.erase )
router.patch( "/:id", authMiddleware.validToken, publicationController.update )
router.get( "/:id", authMiddleware.validToken, publicationController.findById )

export default router