import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import userRepositori from "../repositores/user.repositores.js"
dotenv.config()

const validToken = async (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;
        if (!authHeader)
            return res.status(401).send({ message: "The token was not informed!" });

        const parts = authHeader.split(" "); /* ["Bearer", "asdasdasdadsadasd"] */
        if (parts.length !== 2)
            return res.status(401).send({ message: "Invalid token!" });

        const [scheme, token] = parts;

        if (!/^Bearer$/i.test(scheme))
            return res.status(401).send({ message: "Malformatted Token!" });

        jwt.verify(token, process.env.SECRET_JWT, async (err, decoded) => {
            if (err) return res.status(401).send({ message: "Invalid token!" });

            const user = await userRepositori.findByIdRepositore(decoded.id);
            if (!user || !user.id)
                return res.status(401).send({ message: "Invalid token!" });

            req.userId = user.id;

            return next();
        })

    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

export default { validToken }