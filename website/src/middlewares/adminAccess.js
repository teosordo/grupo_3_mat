module.exports = (req, res, next) => {
    if(/*???*/){
        next();
    } else {
        res.send('Esta página es solo para administradores');
    }
}