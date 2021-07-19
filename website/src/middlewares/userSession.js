const user = require("../models/user");

module.exports = (req, res, next) => {
    let userLogin = req.session.userLogged /*|| user.findByField(req.cookies.userLogged);*/
    res.locals.user = userLogin ? userLogin : null;
    next();
}