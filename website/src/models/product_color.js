const path = require('path')
const fs = require('fs')

const products_colors ={
    all: () =>{
        const directory = path.resolve(__dirname, '../data/products_colors.json')
        const file = fs.readFileSync(directory, 'utf-8')
        const list = JSON.parse(file)
        return list
    }
}

module.exports = products_colors