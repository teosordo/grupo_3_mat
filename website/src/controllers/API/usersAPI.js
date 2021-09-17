const db = require('../../database/models');

const usersController = {
    list: async (req, res) => {
        try {
            const users = await db.User.findAll({attributes: ['id','firstName','lastName','username','email']});
            
            users.forEach(user => {
                user.dataValues.detail = `http://localhost:3000/api/users/${user.id}`
            });

            res.json({
                count: users.length,
                users: users
            });
        } catch(error) {
            throw error;
        }
    },
    detail: async (req, res) => {
        try {
            const user = await db.User.findByPk(req.params.id);

            res.json({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email,
                avatar: `http://localhost:3000/uploads/users/${user.avatar}`
            })
        } catch (error) {
            throw error;
        }
    }
}

module.exports = usersController;