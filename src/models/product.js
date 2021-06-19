const path = require("path")
const fs = require('fs')
const directory = path.resolve(__dirname, '../data/products.json')

const product = {
    all: ()=>{
        const file = fs.readFileSync(directory,'utf-8')
        const list = JSON.parse(file)
        return list
    },
    search:(idProduct)=>{
        const products = product.all()
        let thisProduct = []
        products.forEach(element => {
            if(element.id == idProduct){
                thisProduct.push(element)
            }
        });
        return thisProduct
    }
}

module.exports = product