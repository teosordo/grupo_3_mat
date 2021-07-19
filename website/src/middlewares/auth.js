module.exports = (req, res, next) => {
    if(!req.session.userLogged){
        // Redirigir al perfil
        return res.redirect('/user/login');
    }
    next();
}