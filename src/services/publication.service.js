import Publication from "../models/Publication.js"

const createService = (body) => Publication.create(body)

const findAllService = () => Publication.find()

export default { createService, findAllService }