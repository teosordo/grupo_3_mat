//const user = require("../../models/user");

module.exports = (req, res, next) => {
    let userLogin = req.session.user
    res.locals.user = userLogin ? userLogin : null;
    next();
}