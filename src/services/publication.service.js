import publicationRepositores from "../repositores/publication.repositores.js"

const createService = async (body, userId) => {

    const { title, text } = body

    if (!title || !text) throw new Error("Submits all fields for create post")

    const post = await publicationRepositores.createRepositore({
        title,
        text,
        user: userId
    });

    if (!post) throw new Error("Error creating post")


    return {
        message: "Publication created successfully",
        post: {
            title,
            text
        }
    }

}

const findAllService = async (offset, limit, next, baseUrl) => {

    const total = await publicationRepositores.countAllRepositore()
    const currentUrl = baseUrl

    const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null

    const previous = offset - limit < 0 ? null : offset - limit

    const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null

    const publications = await publicationRepositores.findAllRepositore(offset, limit)

    if (publications.length === 0) throw new Error("There are no created publications")


    publications.shift()

    return {
        nextUrl,
        previousUrl,
        limit,
        offset,
        total,
        results: publications.map(item => ({
            id: item._id,
            title: item.title,
            text: item.text,
            likes: item.likes,
            comments: item.comments,
            date: item.date,
            name: item.user.name,
            username: item.user.username,
            avatar: item.user.avatar,
        }))
    }
}

const topPublicationService = async () => {

    const publications = await publicationRepositores.topRepositore()

    if (!publications) throw new Error("There is no registered publication")

    return {
        publication: {
            id: publications._id,
            title: publications.title,
            text: publications.text,
            likes: publications.likes,
            comments: publications.comments,
            date: publications.date,
            name: publications.user.name,
            username: publications.user.username,
            avatar: publications.user.avatar,
        }
    }
}

const findByIdService = async (publicationId) => {

    if (!publicationId) throw new Error("id not submited")

    const publication = await publicationRepositores.findByIdRepositore(publicationId)

    if (!publication) throw new Error("this publication does not exist")

    return {
        id: publication._id,
        title: publication.title,
        text: publication.text,
        likes: publication.likes,
        comments: publication.comments,
        date: publication.date,
        name: publication.user.name,
        username: publication.user.username,
        avatar: publication.user.avatar,
    }
}

const searchByTitleService = async (offset, limit, next, baseUrl, title) => {

    if (!title) throw new Error("title not submited")

    const publications = await publicationRepositores.searchByTitleRepositore(title, offset, limit)
    const total = await publicationRepositores.countByTitleRepositore(title)
    const currentUrl = baseUrl

    const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null

    const previous = offset - limit < 0 ? null : offset - limit

    const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null

    if (publications.length === 0) throw new Error("There are not publication with this title")

    return {
        nextUrl,
        previousUrl,
        limit,
        offset,
        total,
        results: publications.map((item) => ({
            id: item._id,
            title: item.title,
            text: item.text,
            likes: item.likes,
            comments: item.comments,
            date: item.date,
            name: item.user.name,
            username: item.user.username,
            avatar: item.user.avatar,
        }))
    }
}

const userPublicationsService = async (offset, limit, next, baseUrl, userId) => {

    const id = userId

    const publications = await publicationRepositores.userPublicationsRepositore(id, offset, limit)
    const total = await publicationRepositores.countByIdRepositore(id)
    const currentUrl = baseUrl

    const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null

    const previous = offset - limit < 0 ? null : offset - limit

    const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null

    if (publications.length === 0) throw new Error("There are no posts for this user")

    return {
        nextUrl,
        previousUrl,
        limit,
        offset,
        total,
        results: publications.map((item) => ({
            id: item._id,
            title: item.title,
            text: item.text,
            likes: item.likes,
            comments: item.comments,
            date: item.date,
            name: item.user.name,
            username: item.user.username,
            avatar: item.user.avatar,
        }))
    }
}

const updateService = async (publicationId, body, userId) => {

    const { title, text } = body

    if (!title && !text) throw new Error("Submit at least one field to the update the post")

    const publication = await publicationRepositores.findByIdRepositore(publicationId)

    if (publication.user._id.toString() != userId.toString()) throw new Error("you didn't update this post")

    await publicationRepositores.updateRepositore(publicationId, title, text)

    return { message: "post updated successfully" }
}

const eraseService = async (publicationId, userId) => {

    const publication = await publicationRepositores.findByIdRepositore(publicationId)

    if (publication.user._id.toString() !== userId.toString()) throw new Error("you didn't delete this post")

    await publicationRepositores.eraseRepositore(publicationId)

    return { message: "post deleted successfully" }
}

const likeService = async (publicationId, userId) => {


    const publicationLike = await publicationRepositores.likeRepositore(publicationId, userId)

    if (!publicationLike) {
        await publicationRepositores.deleteLikeRepositore(publicationId, userId)
        return { message: "like removed" }
    }

    return { message: "Like done sucessfully" }
}

const addCommentService = async (publicationId, userId, body) => {

    if (!body) throw new Error("write a message to comment")

    await publicationRepositores.addCommentRepositore(publicationId, userId, body)

    return { message: "Comment sucessfully created" }
}

const deleteCommentService = async (publicationId, commentId, userId) => {
    const idComment = commentId

    const commentDeleted = await publicationRepositores.deleteCommentRepositore(publicationId, idComment, userId)

    const commentFinder = commentDeleted.comments.find((comment) => comment.idComment === idComment)

    if (!commentFinder) throw new Error("Comment not found")

    if (commentFinder.userId.toString() !== userId.toString()) throw new Error("You can't delete this comment")

    return { message: "Comment sucessfully removed" }
}

export default {
    createService,
    findAllService,
    topPublicationService,
    findByIdService,
    searchByTitleService,
    userPublicationsService,
    updateService,
    eraseService,
    likeService,
    addCommentService,
    deleteCommentService
}