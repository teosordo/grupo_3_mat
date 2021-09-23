const db = require('../../database/models');

const usersController = {
    list: async (req, res) => {
        try {
            // Trae todos los usuarios
            const users = await db.User.findAll({attributes: ['id','firstName','lastName','username','email']});
            
            // Crea el campo detail para ser mostrado
            users.forEach(user => {
                user.dataValues.detail = `http://localhost:3000/api/users/${user.id}`
            });

            // Devuelve los datos de los usuarios en formato JSON
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
            // Trae el usuario en cuestión
            const user = await db.User.findByPk(req.params.id, {attributes: ['id', 'firstName', 'lastName', 'username', 'email', 'avatar']});

            // Modifica el campo avatar para que sea una url
            user.avatar = `http://localhost:3000/uploads/users/${user.avatar}`;

            // Devuelve los datos del usuario en formato JSON
            res.json({user})
        } catch (error) {
            throw error;
        }
    }
}

module.exports = usersController;