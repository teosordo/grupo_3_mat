module.exports = (req, res, next) => {
    res.locals.styles = ['normailize.css', 'styles.css'];
    next();
}