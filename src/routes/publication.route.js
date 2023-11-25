import { Router } from "express"
import publicationController from "../controller/publication.controller.js" 
import authMiddleware from "../middlewares/auth.middlewares.js"
import globalMiddleware from "../middlewares/global.middleware.js"


const router = Router()


router.post( "/create", authMiddleware.validToken, publicationController.create )
router.get( "/getAll", globalMiddleware.pagination, publicationController.findAll )
router.get( "/top", publicationController.topPublication )
router.get( "/search", globalMiddleware.pagination, publicationController.searchByTitle )
router.get( "/publicationByUser", authMiddleware.validToken, globalMiddleware.pagination,
publicationController.userPublications )
router.patch( "/like/:id", authMiddleware.validToken, publicationController.like )
router.patch( "/comment/:id", authMiddleware.validToken, publicationController.addComment )
router.patch( "/comment/:idPublication/:idComment", authMiddleware.validToken, publicationController.deleteComment )
router.delete( "/deletePublication/:id", authMiddleware.validToken, publicationController.erase )
router.patch( "/updatePublication/:id", authMiddleware.validToken, publicationController.update )
router.get( "/findById/:id", authMiddleware.validToken, publicationController.findById )

export default router