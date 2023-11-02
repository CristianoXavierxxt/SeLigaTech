import Publication from "../models/Publication.js"

const createService = (body) => Publication.create(body)

const findAllService = ( offset, limit ) => Publication.find().sort( { _id: -1 } ).skip( offset ).limit( limit ).populate("user")

const countAllService = () => Publication.countDocuments()

export default { createService, findAllService, countAllService }