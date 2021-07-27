const {findByField} = require('../models/user')
module.exports = (req,res,next) =>{
    if(req.cookies.email){
        //Busca el usuario segun el email de la cookie
        let user = findByField('email', req.cookies.email)
        delete user.password
        //"Inicia" la sesion
        req.session.user = user
    }
    next()
}