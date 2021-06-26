const products = [
    {id:1,name:"Memoria RAM",brand:"X",price:"$$",priceA:26,discount:99,detail:"esto es una descripción",shipping:"Gratis!",available:"fas fa-check",payment:"fas fa-credit-card",warranty:"1 año",image:"componentRAM.jpg",videos:"https://youtube.com/embed/Eaq89YCDH4s",caract:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, nemo distinctio fugiat repellendus rem, deserunt nihil nisi quis repellat et numquam placeat. Voluptates, porro unde. Iusto nesciunt praesentium expedita mollitia.",specs:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, nemo distinctio fugiat repellendus rem, deserunt nihil nisi quis repellat et numquam placeat. Voluptates, porro unde. Iusto nesciunt praesentium expedita mollitia."},{id:2,name:"Ordenador",brand:"Y",price:"$$$",priceA:20,discount:-9,detail:"esto es una descripción",shipping:"Gratis!",available:"fas fa-check",payment:"fas fa-credit-card",warranty:"2 años",image:"componentCASE.jpg",videos:"https://youtube.com/embed/HSseaknEv9Q",caract:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, nemo distinctio fugiat repellendus rem, deserunt nihil nisi quis repellat et numquam placeat. Voluptates, porro unde. Iusto nesciunt praesentium expedita mollitia.",specs:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, nemo distinctio fugiat repellendus rem, deserunt nihil nisi quis repellat et numquam placeat. Voluptates, porro unde. Iusto nesciunt praesentium expedita mollitia."},{id:3,name:"Tarjeta gráfica",brand:"Z",price:"$$$",priceA:2,discount:20,detail:"esto es una descripción",shipping:"Gratis!",available:"fas fa-check",payment:"fas fa-credit-card",warranty:"6 meses",image:"componentGC.jpg",videos:"https://www.youtube.com/embed/uTwPn3JWfV4",caract:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, nemo distinctio fugiat repellendus rem, deserunt nihil nisi quis repellat et numquam placeat. Voluptates, porro unde. Iusto nesciunt praesentium expedita mollitia.",specs:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, nemo distinctio fugiat repellendus rem, deserunt nihil nisi quis repellat et numquam placeat. Voluptates, porro unde. Iusto nesciunt praesentium expedita mollitia."},{id:4,name:"Motherboard 22003",brand:"Megabyte",price:2000,priceA:2000,discount:0,detail:"esto es un detalle del producto",available:"fas fa-check",payment:"fas fa-credit-card",shipping:"Gratis!",warranty:"6 meses",image:"img-1624327518297.png",videos:"https://youtube.com/embed/rx71hDO-fqQ",caract:"esto es una caracteristica ",specs:"1 motherboard"}
];

const userController = {
    login: (req, res) => {
        res.render('users/login');
    },
    register: (req, res) => {
        res.render('users/register');
    },
    productCart: (req, res) => {
        total = products.reduce((total, product) => {
            return total + product.priceA;
        }, 0);

        res.render('users/productCart', {product: products});
    }
};

module.exports = userController;