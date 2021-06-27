const path =  require('path')
const fs = require('fs')
const color ={
    all: ()=>{
        const directory = path.resolve(__dirname, '../data/colors.json')
        const file = fs.readFileSync(directory, 'utf-8')
        const list = JSON.parse(file)
        return list
    },
    search:(idColor)=>{
        const allColors = color.all()
        const oneColor = allColors.find(element => element.id == idColor)
        return oneColor
    }
}

module.exports = color
