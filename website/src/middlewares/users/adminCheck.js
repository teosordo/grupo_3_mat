module.exports = (req,res,next) => {
    //Permisos de administrador
    req.session.user.dataValues.admin = req.session.user.email.indexOf('@matech.com') !== -1 ? true : false;
    next();
}