module.exports = (req, res, next) => {
    if(res.locals.mantenimiento){
        res.send("Página en mantenimiento")
    } else {
        next();
    }
}