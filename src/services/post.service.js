import Post from "../models/Post.js"

const createService = (body) => Post.create(body)

const findAllService = () => Post.find()

export default { createService, findAllService }