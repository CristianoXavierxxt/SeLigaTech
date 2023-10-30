import { Router } from "express"
import publicationController from "../controller/publication.controller.js" 
import authMiddleware from "../middlewares/auth.middlewares.js"


const router = Router()


router.post("/", authMiddleware.validToken, publicationController.create)
router.get("/", authMiddleware.validToken, publicationController.findAll)

export default router