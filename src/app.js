const express = require('express');
const app = express();
const path = require('path');

// Servidor
app.set("port", process.env.PORT || 3000);
app.listen(app.get('port'), ()=> console.log('Server en http://localhost:' + app.get('port')));

// Configuración
app.use(express.static(path.resolve(__dirname, '../public')));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

// Rutas
// Index
const mainRouter = require('./routes/mainRoutes');
app.use(mainRouter);
// Products
const productRouter = require('./routes/productRoutes');
app.use(productRouter);
// User
const userRouter = require('./routes/userRoutes');
app.use(userRouter);

/*app.get('/',(req, res)=>{res.sendFile(path.resolve(__dirname, './views/index.html'))});
app.get('/login', (req, res) => {res.sendFile(path.resolve(__dirname, './views/login.html'))});
app.get('/productCart', (req, res) => {res.sendFile(path.resolve(__dirname, './views/productCart.html'))});
app.get('/productDetail', (req, res) => {res.sendFile(path.resolve(__dirname, './views/productDetail.html'))});
app.get('/register', (req, res) => {res.sendFile(path.resolve(__dirname, './views/register.html'))});*/