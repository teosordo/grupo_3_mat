const products = [
    { nombre: "Memoria RAM", marca:"X", precio: 26, descuento: 99, detalle: "esto es una descripcion :D", envio: "Gratis!", disponibilidad: "fas fa-check", pago: "fas fa-credit-card", garantia: "1 año", img:"/imgs/index/componentRAM.jpg", caract: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, nemo distinctio fugiat repellendus rem, deserunt nihil nisi quis repellat et numquam placeat. Voluptates, porro unde. Iusto nesciunt praesentium expedita mollitia.", esp: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, nemo distinctio fugiat repellendus rem, deserunt nihil nisi quis repellat et numquam placeat. Voluptates, porro unde. Iusto nesciunt praesentium expedita mollitia."},
    { nombre: "Ordenador", marca:"Y", precio: 20, descuento: 10, detalle: "esto es una descripcion :D", envio: "Gratis!", disponibilidad: "fas fa-check", pago: "fas fa-credit-card", garantia: "2 años", img:"/imgs/index/componentCASE.jpg", caract: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, nemo distinctio fugiat repellendus rem, deserunt nihil nisi quis repellat et numquam placeat. Voluptates, porro unde. Iusto nesciunt praesentium expedita mollitia.", esp: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, nemo distinctio fugiat repellendus rem, deserunt nihil nisi quis repellat et numquam placeat. Voluptates, porro unde. Iusto nesciunt praesentium expedita mollitia."},
    { nombre: "Tarjeta gráfica", marca:"Z", precio: 2, descuento: 20, detalle: "esto es una descripcion :D",envio: "Gratis!", disponibilidad: "fas fa-check", pago: "fas fa-credit-card", garantia: "6 meses", img:"/imgs/index/componentGC.jpg", caract: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, nemo distinctio fugiat repellendus rem, deserunt nihil nisi quis repellat et numquam placeat. Voluptates, porro unde. Iusto nesciunt praesentium expedita mollitia.", esp: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, nemo distinctio fugiat repellendus rem, deserunt nihil nisi quis repellat et numquam placeat. Voluptates, porro unde. Iusto nesciunt praesentium expedita mollitia."}
];

const userController = {
    login: (req, res) => {
        res.render('login');
    },
    register: (req, res) => {
        res.render('register');
    },
    productCart: (req, res) => {
        total = products.reduce((total, product) => {
            return total + product.precio;
        }, 0);

        res.render('productCart', {product: products});
    }
};

module.exports = userController;