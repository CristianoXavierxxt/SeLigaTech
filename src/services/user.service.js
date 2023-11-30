import userRepositores from "../repositores/user.repositores.js"
import authRepositore from "../repositores/auth.repositores.js"
import bcrypt from "bcrypt"

const createUserService = async ( body ) => {
    const { name, username, email, password, avatar } = body

    if( !name || !username || !email || !password || !avatar ) throw new Error( "Submits all fields for registration" )

    const foundUser = await userRepositores.findByEmailRepositore(email)

    if(foundUser) throw new Error( "User already exist " )
        
    const user = await userRepositores.createRepositore( body );

    if( !user ) throw new Error( "Error creating user" )

    const token = authRepositore.generateToken( user.id )

    return token
};

const findAllService = async () => {

    const users = await userRepositores.findAllRepositore();
        
    if( users.length === 0 ) throw new Error( "There are no registered users" )

    return users 
}

const findByIdService = async( userIdParam, userIdLogged ) => {
    let idParam;
    if (!userIdParam) {
      userIdParam = userIdLogged;
      idParam = userIdParam;
    } else {
      idParam = userIdParam;
    }
    if (!idParam)
      throw new Error("Send an id in the parameters to search for the user");
  
    const user = await userRepositores.findByIdRepositore(idParam);
  
    if (!user) throw new Error("User not found");
  
    return user;
}

const updateUserSercice = async ( userId, userIdLogged, body ) => {

  let { name, username, email, password, avatar } = body

  if( !name && !username &&  !email &&  !password && !avatar ) throw new Error( "Submits at least one field for update" )

  const user = await userRepositores.findByIdRepositore(userId);

  if (user._id != userIdLogged) throw new Error("You cannot update this user");

  if (password) password = await bcrypt.hash(password, 10);

  await userRepositores.updateUserRepositore( 
    userId,
    name,
    username,
    email,
    password,
    avatar
  )

  return { message: "User successfully update" } 
}

export default { createUserService, findAllService, findByIdService, updateUserSercice }