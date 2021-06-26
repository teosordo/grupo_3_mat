const path = require('path')
const fs = require('fs')

const brand ={
    all: () =>{
        const directory = path.resolve(__dirname, '../data/brands.json')
        const file = fs.readFileSync(directory, 'utf-8')
        const list = JSON.parse(file)
        return list
    },
    search:(idBrand)=>{
        const allBrands = brand.all()
        const oneBrand = allBrands.find(element => element.id == idBrand)
        return oneBrand
    }
}

module.exports = brand