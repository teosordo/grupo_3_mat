const user = require("../models/user");

module.exports = (req, res, next) => {
    let userLogin = req.session.userLogged || user.findByField(req.cookies.email);
    res.locals.user = userLogin ? userLogin : null;

    let userLog = req.session.logged
    res.locals.userJSON = userLog ? userLog : null;
    next();
}