const productsFunctions = require('../models/product');
const userFunctions = require('../models/user');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models')

const User = db.User;

const userController = {
    login: (req, res) => {
        res.render('users/login');
    },
    loginProcess: (req, res) => {
        // Validación
        const results = validationResult(req);
        if(results.errors.length > 0){
            return res.render('users/login',{errors: results.mapped(), userInfo: req.body})
        }

        // Cookie - Recuerda al usuario
        if(req.body.remember != undefined){
            res.cookie('email', req.session.user.email,{maxAge: 9999999 })
        }

        return res.redirect('/')
        
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
            return res.render('users/register',{errors: result.mapped(), userInfo: req.body})
        }else{
            try {
                let newUser = await db.User.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    username: req.body.username,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    avatar: req.file == undefined ? 'default-user.jpg' : req.file.filename
                })
                res.redirect('/')
            } catch (error) {
                throw error
            }
        }
    },
    productCartAdd: async (req, res) => {
        try {
            let product = await db.Product.findOne({where:{id: req.params.id}})
            let userCart  = await db.Cart.findOne({where:{user_id: req.session.user.id, purchase_date: null}})
            console.log(userCart);
            if(userCart == null){
                userCart = await db.Cart.create({
                    user_id: req.session.user.id
                })
                let cartItem = await db.CartProducts.create({
                    cart_id: userCart.id,
                    product_id: product.id,
                    products_price: product.price,
                    products_amount: product.id
                })
                await db.Cart.update({
                    total_products: await db.CartProducts.sum('products_amount',{where:{cart_id: userCart.id}}),
                    final_price: await db.CartProducts.sum('products_price',{where:{cart_id: userCart.id}})
                },{where:{id: userCart.id}})

                return res.redirect('/')
            }else{
                let cartItem = await db.CartProducts.create({
                    cart_id: userCart.id,
                    product_id: product.id,
                    products_price: product.price,
                    products_amount: 1
                })
                await db.Cart.update({
                    total_products: await db.CartProducts.sum('products_amount',{where:{cart_id: userCart.id}}),
                    final_price: await db.CartProducts.sum('products_price',{where:{cart_id: userCart.id}})
                },{where:{id: userCart.id}})
                return res.redirect('/')
            }
        } catch (error) {
            throw error
        }
    },
    productCart: async (req, res) => {
        let userCart = await db.Cart.findOne({
            where:{user_id: req.session.user.id, purchase_date: null},
            include:[
                {model: db.CartProducts, as:'cart_products', include: [{model: db.Product, as:'products', include: ['images']}]}
            ]})

        res.render('users/productCart', {products: userCart});
    },
    userlist: async (req,res) => {
        res.render('users/list',{users: await User.findAll()})
    },
    userProfile: (req,res) => {
        res.render('users/userProfile', {user: req.session.user});
    },
    userEdit: async (req,res) => res.render('users/userEdit',{
        //Recupero datos de la base de datos (User)
        user: await User.findByPk(req.params.id)
    }),
    userUpdate: async (req, res) => {
        let userToEdit = await User.update(req.body, {where : {id: req.params.id}})
        return res.redirect('/');
    },
    userDelete: (req,res) => {

    }
};
module.exports = userController;