module.exports = (req, res, next) => {
    res.locals.styles = ['normalize.css', 'styles.css', 'paged.css'];
    next();
}