const db = require("../../database/models");
module.exports = async (req,res,next) =>{
    try {
        if(req.cookies.email){
            //Busca el usuario segun el email de la cookie
            let user = await db.User.findOne({ where: {email: req.cookies.email} })
            delete user.password
            //"Inicia" la sesion
            req.session.user = user;
            req.session.user.admin = await db.User.findOne({
                where: {
                    [db.Sequelize.Op.and] : [{
                        email: req.cookies.email
                    },{
                        email: {[db.Sequelize.Op.like]: '%@matech.com'}
                    }]
                }
            }) != null ? true : null
        }   
    } catch (error) {
        throw error
    }
    next()
}