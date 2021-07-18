const express = require('express');
const app = express();
const path = require('path');
const method = require('method-override');

// Servidor
app.set("port", process.env.PORT || 3000);
app.listen(app.get('port'), ()=> console.log('Server en http://localhost:' + app.get('port')));

// Configuración
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.urlencoded({extended:false}))
app.use(method("_method"))

// View Engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

// Middleware Aplicación
    // Estilos css globales
const styles = require('./middlewares/styles')
app.use(styles);

    //Página en mantenimiento
const mantain = require('./middlewares/mantain')
app.use(mantain);


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