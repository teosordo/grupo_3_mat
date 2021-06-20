const path = require("path")
const fs = require('fs')

const product = {
    all: ()=>{
        const directory = path.resolve(__dirname, '../data/products.json');
        const file = fs.readFileSync(directory,'utf-8');
        const list = JSON.parse(file);
        return list
    },
    write:(products)=>{
        const directory = path.resolve(__dirname, '../data/products.json');
        let newProducts = JSON.stringify(products);
        fs.writeFileSync(directory, newProducts);
        return true
    },
    search:(idProduct)=>{
        let products = product.all();
        let thisProduct = [];
        products.forEach(element => {
            if(element.id == idProduct){
                thisProduct.push(element)
            }
        });
        return thisProduct
    },
    create:(newData, imgFile)=>{
        let products = product.all();
        let newId = products.length > 0? products[products.length-1].id +1 : 1
        let newProduct = {
            id: newId,
            nombre: newData.nombre,
            precio: newData.precio, 
            precioA:  newData.precio, 
            descuento: 40,
            detalle: newData.detalle,
            envio: "Gratis!", 
            disponibilidad: "fas fa-check", 
            pago: "fas fa-credit-card", 
            garantia: newData.garantia,
            img: imgFile.filename,
            caract:  newData.caract,
            esp:    newData.esp

        }
        products.push(newProduct);
        if(product.write(products) == true){
            return true
        }else{
            return console.log('error');
        }   
    }
}

module.exports = product