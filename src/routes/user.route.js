const route = require( "express" ).Router();
const userController = require( "../controller/user.controller" );

route.get( "/", userController.cadastro )

module.exports =  route; 
