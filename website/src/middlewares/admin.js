module.exports = (req, res, next) => {
    req.body.admin = req.body.email.indexOf('@hotmail.com') !== -1 ? true : false;
    next();
}