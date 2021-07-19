module.exports = (req, res, next) => {
    res.locals.mantenimiento = false;
    next();
}