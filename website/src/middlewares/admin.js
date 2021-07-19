module.exports = (req, res, next) => {
    req.body.admin = req.body.user.indexOf('teusa28') !== -1 ? true : false;
    next();
}