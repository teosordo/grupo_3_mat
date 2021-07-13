const {all} = require('../models/user');

module.exports = (req,res,next)=>{
    let userList = all();
    userList.forEach(user => {
        if(user.email == req.body.email){
            throw new Error('El e-mail ya esta en uso');
        }else{
            next();
        }
    });
}