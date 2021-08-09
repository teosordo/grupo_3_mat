const path = require('path')
const fs = require('fs')

const images ={
    all: () =>{
        const directory = path.resolve(__dirname, '../data/images.json')
        const file = fs.readFileSync(directory, 'utf-8')
        const list = JSON.parse(file)
        return list
    }
}

module.exports = images