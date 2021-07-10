const path = require("path")
const fs = require('fs')


const user = {
    all: ()=>{
        const directory = path.resolve(__dirname, '../data/users.json');
        const file = fs.readFileSync(directory,'utf-8');
        const list = JSON.parse(file);
        return list;
    },
    write:(userList)=>{
        const directory = path.resolve(__dirname, '../data/users.json');
        let newProducts = JSON.stringify(products,null,2);
        fs.writeFileSync(directory, newProducts);
        return true
    },
    create: (newData, imgFile)=>{
        let users = user.all();
        let newId = users.length > 0? users[users.length-1].id +1 : 1
        let newUser = {
            id: newId,
            firstName: newData.name,
            lastName: newData.lastName,
            email: newData.email,
            password: newData.password,
            avatar: imgFile.filename
        }
        users.push(newUser);
        if(product.write(products) == true){
            return true
        }
    }
}

module.exports = user