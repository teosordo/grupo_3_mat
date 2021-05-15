const express = require('express');
const app = express();
const path = require('path');

app.listen(3000, ()=>console.log('El servidor esta corriendo en http://localhost:3000'));
app.use(express.static(path.resolve(__dirname, './public')));

app.get('/',(req, res)=>{
    res.sendFile(path.resolve(__dirname, './views/home.html'))});