module.exports = (req, res, next) => {
    res.locals.mantenimiento = false;
    if(res.locals.mantenimiento){
        res.render("maintainment");
    } else {
        next();
    }
}