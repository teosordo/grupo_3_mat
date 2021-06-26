const path =  require('path')
const fs = require('fs')
const category ={
    all: ()=>{
        const directory = path.resolve(__dirname, '../data' + '/categories.json')
        const file = fs.readFileSync(directory, 'utf-8')
        const list = JSON.parse(file)
        return list
    },
    search:(idCategory)=>{
        const allCategories = category.all()
        const oneCategory = allCategories.find(element => element.id == idCategory)
        return oneCategory
    }
}

module.exports = category
