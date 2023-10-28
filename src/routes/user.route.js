const route = require( "express" ).Router();
const userController = require( "../controller/user.controller" );
const { validId, validUser } = require( "../middlewares/global.middleware" )

route.post( "/", userController.create )
route.get( "/", userController.findAll )
route.get( "/:id", validId, validUser, userController.findById )  
route.patch( "/:id", validId, validUser, userController.updateUser )

module.exports =  route; 