const userController = {
    login: (req, res) => {
        res.render('login');
    },
    register: (req, res) => {
        res.render('register');
    },
    productCart: (req, res) => {
        res.render('productCart');
    }
};

module.exports = userController;