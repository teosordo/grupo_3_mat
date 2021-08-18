const productsFunctions = require('../models/product');
const userFunctions = require('../models/user');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models')

const userController = {
    login: (req, res) => {
        res.render('users/login');
    },
    loginProcess: (req, res) => {
        // Validación
        const results = validationResult(req);
        if(results.errors.length > 0){
            return res.render('users/login',{errors: results.mapped(), userInfo: req.body});
        }

        // Cookie - Recuerda al usuario
        if(req.body.remember != undefined){
            res.cookie('email', req.session.user.email,{maxAge: 9999999 });
        }

        return res.redirect('/');
        
    },
    logout: (req, res) => {
        res.clearCookie('email');
        req.session.destroy();
        return res.redirect('/');
    },
    register: (req, res) => {
        res.render('users/register');
    },
    createUser: async (req, res) => {
        const result = validationResult(req);
        if(result.errors.length > 0){
            return res.render('users/register',{errors: result.mapped(), userInfo: req.body});
        }else{
            try {
                let newUser = await db.User.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    username: req.body.username,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    avatar: req.file == undefined ? 'default-user.jpg' : req.file.filename
                });
                res.redirect('/');
            } catch (error) {
                throw error;
            }
        }
    },
    productCartAdd: async (req, res) => {
        try {
            //Busca el producto que se quiere agregar
            let product = await db.Product.findOne({where:{id: req.params.id}})
            //Busco si el usuario tiene un carrito
            let userCart  = await db.Cart.findOne({where:{user_id: req.session.user.id, purchase_date: null}})
            //Crea el carrito si el usuario no tiene un carrito activo
            if(userCart == null){
                userCart = await db.Cart.create({
                    user_id: req.session.user.id
                });
                let cartItem = await db.CartProducts.create({
                    cart_id: userCart.id,
                    product_id: product.id,
                    products_price: product.price,
                    products_amount: product.id
                });
                //Actualiza el carrito con la informacion del cart_products
                await db.Cart.update({
                    total_products: await db.CartProducts.sum('products_amount',{where:{cart_id: userCart.id}}),
                    final_price: await db.CartProducts.sum('products_price',{where:{cart_id: userCart.id}})
                },{where:{id: userCart.id}});

                return res.redirect('/');
            }else{
                let checkItems = await db.CartProducts.findOne({where:{cart_id: userCart.id, product_id: product.id}})
                //Valida si el producto ya fue agregado al carrito, si es asi le suma 1 a su cantidad
                if(checkItems){
                    db.CartProducts.update({
                        products_amount: checkItems.products_amount + 1},
                        {where:{cart_id: userCart.id, product_id: product.id}});
                }else{
                    await db.CartProducts.create({
                        cart_id: userCart.id,
                        product_id: product.id,
                        products_price: product.price,
                        products_amount: 1
                    });
                }
                
                //Actualiza el carrito con la informacion del cart_products
                await db.Cart.update({
                    total_products: await db.CartProducts.sum('products_amount',{where:{cart_id: userCart.id}}),
                    final_price: await db.CartProducts.sum('products_price',{where:{cart_id: userCart.id}})},
                    {where:{id: userCart.id}
                });

                return res.redirect('/');
            }
        } catch (error) {
            throw error;
        }
    },
    productCart: async (req, res) => {
        let userCart = await db.Cart.findOne({
            where:{user_id: req.session.user.id, purchase_date: null},
            include:[
                {model: db.CartProducts, as:'cart_products', include: [{model: db.Product, as:'products', include: ['images']}]}
            ]});

        res.render('users/productCart', {products: userCart});
    },
    userlist: async (req,res) => {
        res.render('users/list',{users: await db.User.findAll(), user: req.session.user})
    },
    userProfile: (req,res) => {
        res.render('users/userProfile', {user: req.session.user});
    },
    userEdit: async (req,res) => {
        res.render('users/userEdit',{
            //Recupero datos de la base de datos (User) segun el usuario logueado
            users: await db.User.findByPk(req.session.user.id)
        })
    },
    userUpdate: async (req, res) => {
        // Carga de validaciones
        const result = validationResult(req);

        // Se utiliza al user de la db segun el usuario en session
        const users = await db.User.findByPk(req.session.user.id)
        
        // Si hay errores se cargan en la vista de edit 
        // Si no hay errores se sobreescriben los datos a partir de los datos en body
        if(result.errors.length > 0){
            return res.render('users/userEdit' ,{errors: result.mapped(), user: req.session.user})
        }else{
            try {
                let userToEdit = await db.User.update({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    username: req.body.username,
                    email: req.body.email,
                    // Si no se carga nada en el input de contraseña se deja a original
                    // De lo contrario se carga la nueva
                    password: req.body.password == '' ? users.password : bcrypt.hashSync(req.body.password, 10),
                    // Si no se selecciona una imagen se deja el avatar anterior
                    // De lo contrario se carga la nueva imagen
                    avatar: req.file == undefined ? users.avatar : req.file.filename
                },{
                    // Segun el user en session
                    where : {id: req.session.user.id}
                })
                res.redirect('/users/profile');
            } catch (error) {
                throw error
            }
        }
    },
    userDelete: async (req,res) => {
        try {
            //Elimina al usuario logueado y lo redirige al home
            await db.User.destroy({where : {id: req.session.user.id}})
            res.redirect('/');
        } catch (error) {
            throw error
        }
    },
    profile: async (req, res) => {
        res.render('users/deleteUser', {
            // Se utiliza al user de la db segun el usuario en session
            user: await db.User.findByPk(req.params.id)
        })
    },
    delete: async (req, res) => {
        try {
            //Elimina al usuario seleccionado y redirige a la lista de usuarios
            await db.User.destroy({where : {id: req.params.id}})
            res.redirect('/users/list');
        } catch (error) {
            throw error
        }
    }
};
module.exports = userController;