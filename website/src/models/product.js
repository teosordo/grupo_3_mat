const path = require("path")
const fs = require('fs')
//Funciones de los otros modelos
const brandModel = require('./brand')
const categoryModel = require('./category')
const colorModel = require('./color')


const product = {
    all: ()=>{
        const directory = path.resolve(__dirname, '../data/products.json');
        const file = fs.readFileSync(directory,'utf-8');
        const list = JSON.parse(file);
        return list;
    },
    allComplete:()=>{
        let products = product.all();
        products.map(element=> {
            element.brand = brandModel.search(element.brand);
            return element;
        }).map(element=> {
            element.category = categoryModel.search(element.category);
            return element;
        }).map(element=>{
            element.color = element.color.map(element=>{
                element = colorModel.search(element);
                return element;
            })
            return element
        })
        return products
    },
    write:(products)=>{
        const directory = path.resolve(__dirname, '../data/products.json');
        let newProducts = JSON.stringify(products,null,2);
        fs.writeFileSync(directory, newProducts);
        return true
    },
    search:(idProduct)=>{
        let products = product.allComplete()
        let oneProduct = products.find(element => element.id == idProduct)
        return oneProduct
    },
    create:(newData, imgFile)=>{
        let products = product.all();
        let newId = products.length > 0? products[products.length-1].id +1 : 1
        let newProduct = {
            id: newId,
            name: newData.name,
            brand: parseInt(newData.brand),
            category: parseInt(newData.category),
            color: typeof newData.colors == 'string' ? [newData.colors] : newData.colors.map(element => parseInt(element)),
            price: parseInt(newData.price),
            discount: 0,
            stock: parseInt(newData.stock),
            shipping: "Gratis!",
            payment: "fas fa-credit-card",         
            warranty: newData.warranty,
            image: imgFile.filename,
            videos: newData.videos,
            caract: newData.caract,
            specs: newData.specs
        }
        products.push(newProduct);
        if(product.write(products) == true){
            return true
        }else{
            return console.log('error');
        }   
    },
    deleteAll: function (idProduct) {
        let products = this.all();
        let deleted = this.search(idProduct);
        // Unlink de las imagenes del producto
        fs.unlinkSync(path.resolve(__dirname,"../../public/uploads/products",deleted.image));
        // Sobreesribe el array excluyendo al producto seleccionado
        products = products.filter(producto => producto.id != deleted.id )
        if(product.write(products) == true){
            return true
        }else{
            return console.log('error');
        } 
    },
    edit: function(data, file, id){
        let products = product.all();
        
        products.map(producto => {
            if(producto.id == id){
                producto.name = data.name;
                producto.brand = parseInt(data.brand);
                producto.category = parseInt(data.category);
                producto.color = typeof data.colors == 'string' ? [data.colors] : data.colors.map(element => parseInt(element));
                producto.price = parseInt(data.price);
                producto.discount = parseInt(data.discount);
                producto.stock = parseInt(data.stock);       
                producto.warranty = data.warranty;
                producto.image = file == undefined ? producto.image : file.filename; // hacer con express-validator
                producto.videos = data.videos;
                producto.caract = data.caract;
                producto.specs = data.specs;

                return producto;
            }
            return producto;
        })

        if(product.write(products) == true){
            return true
        }else{
            return console.log('error');
        } 
    }
}

module.exports = product