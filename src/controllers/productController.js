const product = [
    { nombre: "Memoria RAM", marca:"X", precio: "$$", envio: "Gratis!", disponibilidad: "fas fa-check", pago: "fas fa-credit-card", garantia: "1 año", img:"/imgs/index/componentRAM.jpg", caract: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, nemo distinctio fugiat repellendus rem, deserunt nihil nisi quis repellat et numquam placeat. Voluptates, porro unde. Iusto nesciunt praesentium expedita mollitia.", esp: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, nemo distinctio fugiat repellendus rem, deserunt nihil nisi quis repellat et numquam placeat. Voluptates, porro unde. Iusto nesciunt praesentium expedita mollitia."},
    { nombre: "Ordenador", marca:"Y", precio: "$$$", envio: "Gratis!", disponibilidad: "fas fa-check", pago: "fas fa-credit-card", garantia: "2 años", img:"/imgs/index/componentCASE.jpg", caract: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, nemo distinctio fugiat repellendus rem, deserunt nihil nisi quis repellat et numquam placeat. Voluptates, porro unde. Iusto nesciunt praesentium expedita mollitia.", esp: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, nemo distinctio fugiat repellendus rem, deserunt nihil nisi quis repellat et numquam placeat. Voluptates, porro unde. Iusto nesciunt praesentium expedita mollitia."},
    { nombre: "Tarjeta gráfica", marca:"Z", precio: "$$$", envio: "Gratis!", disponibilidad: "fas fa-check", pago: "fas fa-credit-card", garantia: "6 meses", img:"/imgs/index/componentGC.jpg", caract: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, nemo distinctio fugiat repellendus rem, deserunt nihil nisi quis repellat et numquam placeat. Voluptates, porro unde. Iusto nesciunt praesentium expedita mollitia.", esp: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, nemo distinctio fugiat repellendus rem, deserunt nihil nisi quis repellat et numquam placeat. Voluptates, porro unde. Iusto nesciunt praesentium expedita mollitia."}
];

const productController = {
    productDetail: (req, res) => {
        idProduct = req.params.id;
        res.render('productDetail', {product: product});
    }
};

module.exports = productController;