const path = require("path")
const fs = require('fs')
const bcrypt = require('bcryptjs')

const user = {
    all: ()=>{
        const directory = path.resolve(__dirname, '../data/users.json');
        const file = fs.readFileSync(directory,'utf-8');
        const list = JSON.parse(file);
        return list;
    },
    write:(userList)=>{
        const directory = path.resolve(__dirname, '../data/users.json');
        let newUserList = JSON.stringify(userList,null,2);
        fs.writeFileSync(directory, newUserList);
        return true
    },
    search:(userId) =>{
        const userList = user.all()
        let thisUser = userList.find(element => element.id == userId)
        return thisUser
    },
    create: (newData, imgFile)=>{
        let users = user.all();
        let newId = users.length > 0? users[users.length-1].id +1 : 1
        let newUser = {
            id: newId,
            firstName: newData.firstName,
            lastName: newData.lastName,
            username: newData.username,
            email: newData.email,
            password: bcrypt.hashSync(newData.password, 10),
            admin: newData.email.indexOf('@matech.com') >= 0? 1 : 0,
            avatar: imgFile == undefined ? 'default-user' : imgFile.filename
        }
        users.push(newUser);
        if(user.write(users) == true){
            return true
        }
    }
}

module.exports = user