const productsFunctions = require('../models/product');
const userFunctions = require('../models/user');

const userController = {
    login: (req, res) => {
        res.render('users/login');
    },
    loginProcess: (req, res) => {
        let userToLogin = user.findByField('username', req.body.text);
        // Si el usuario exite devulve usuario, si no devuelve mensaje de error
        if(userToLogin){
            //comparo contraseña hasheada
            let okPassword = bcryptjs.compareSync(re.body.password, userToLogin.password);
            if(okPassword){
                return res.redirect('/')
            }
            return res.render('users/login', {
                errors:{
                    email: {
                        msg: 'El dato ingresado es incorrecto'
                    }
                }
            });
        }
        return res.render('users/login', {
            errors:{
                email: {
                    msg: 'No existe este usuario.'
                }
            }
        });
    },
    register: (req, res) => {
        res.render('users/register');
    },
    createUser: (req, res) => {
        res.send(userFunctions.all());
    },
    productCart: (req, res) => {
        total = productsFunctions.all().reduce((total, product) => {
            return total + product.priceA;
        }, 0);

        res.render('users/productCart', {product: productsFunctions.all()});
    }
};

module.exports = userController;