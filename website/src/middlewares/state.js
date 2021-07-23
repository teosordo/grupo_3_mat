module.exports = (req, res, next) => {
    if(res.locals.mantenimiento){
        res.render("maintainment");
    } else {
        next();
    }
}