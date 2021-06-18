const product = [
    { nombre: "Memoria RAM", marca:"X", precio: "$$", envio: "Gratis!", disponibilidad: "fas fa-check", pago: "fas fa-credit-card", garantia: "1 año", img:"/imgs/index/componentRAM.jpg", caract: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, nemo distinctio fugiat repellendus rem, deserunt nihil nisi quis repellat et numquam placeat. Voluptates, porro unde. Iusto nesciunt praesentium expedita mollitia.", esp: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, nemo distinctio fugiat repellendus rem, deserunt nihil nisi quis repellat et numquam placeat. Voluptates, porro unde. Iusto nesciunt praesentium expedita mollitia."},
    { nombre: "Ordenador", marca:"Y", precio: "$$$", envio: "Gratis!", disponibilidad: "fas fa-check", pago: "fas fa-credit-card", garantia: "2 años", img:"/imgs/index/componentCASE.jpg", caract: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, nemo distinctio fugiat repellendus rem, deserunt nihil nisi quis repellat et numquam placeat. Voluptates, porro unde. Iusto nesciunt praesentium expedita mollitia.", esp: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, nemo distinctio fugiat repellendus rem, deserunt nihil nisi quis repellat et numquam placeat. Voluptates, porro unde. Iusto nesciunt praesentium expedita mollitia."},
    { nombre: "Tarjeta gráfica", marca:"Z", precio: "$$$", envio: "Gratis!", disponibilidad: "fas fa-check", pago: "fas fa-credit-card", garantia: "6 meses", img:"/imgs/index/componentGC.jpg", caract: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, nemo distinctio fugiat repellendus rem, deserunt nihil nisi quis repellat et numquam placeat. Voluptates, porro unde. Iusto nesciunt praesentium expedita mollitia.", esp: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, nemo distinctio fugiat repellendus rem, deserunt nihil nisi quis repellat et numquam placeat. Voluptates, porro unde. Iusto nesciunt praesentium expedita mollitia."}
];
// Usar el js de Matias
/*
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
*/
const productController = {
    productDetail: (req, res) => {
        const idProduct = req.params.id;
        res.render('productDetail', {product: product});
    }
};

module.exports = productController;