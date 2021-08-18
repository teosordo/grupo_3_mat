//const user = require("../../models/user");

const db = require("../../database/models");

module.exports = async (req, res, next) => {
    let userLogin = req.session.user
    //res.locals.user = userLogin ? userLogin : null;

    if(userLogin){
        if(userLogin.admin){
            userLogin = await db.User.findByPk(userLogin.id)
            userLogin.dataValues.admin = true;
        }else{
            userLogin = await db.User.findByPk(userLogin.id)
            userLogin.dataValues.admin = false;
        }
        req.session.user = userLogin.dataValues;
        res.locals.user = req.session.user;
        next();
    }else{
        res.locals.user = null;
        next();
    }

}