const express = require('express');
const app = express();
const session = require('express-session');
const cookie = require('cookie-parser');
const path = require('path');
const method = require('method-override');

// Servidor
app.set("port", process.env.PORT || 3000);
app.listen(app.get('port'), ()=> console.log('Server en http://localhost:' + app.get('port')));

// Configuración
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.urlencoded({extended:false}))
app.use(method("_method"))
app.use(cookie())
app.use(session({resave:false,saveUninitialized:false,secret:'matech'}))

// View Engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

// Middleware Aplicación
    // Estilos css globales
app.use(require('./middlewares/styles'));
    //Página en mantenimiento
app.use(require('./middlewares/maintain'));
    //Cookie para recordar usuario
app.use(require('./middlewares/users/userCookie'))
    //Sesion de Usuarios
app.use(require('./middlewares/users/userSession'));

// Rutas
    // Index
const mainRouter = require('./routes/mainRoutes');
app.use('/', mainRouter);
    // Products
const productRouter = require('./routes/productRoutes');
app.use('/products', productRouter);
    // User
const userRouter = require('./routes/userRoutes');
app.use('/users', userRouter);