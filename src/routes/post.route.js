import { Router } from "express"
import postController from "../controller/post.controller.js" 


const router = Router()


router.post("/", postController.create)
router.get("/", postController.findAll)

export default router