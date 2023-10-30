import { Router } from "express"
import publicationController from "../controller/publication.controller.js" 


const router = Router()


router.post("/", publicationController.create)
router.get("/", publicationController.findAll)

export default router