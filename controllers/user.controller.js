const user = require('../services/user.service');
const createError = require('http-errors');

class UserController{
    static someUsers = async (req, res, next) => {
		try {
			const users = await user.someUsers();
			res.status(200).json({
				status: true,
				message: 'Here are some users',
				data: users,
			});
		} catch (e) {
			next(createError(e.statusCode, e.message));
		}
	};
    static deleteUser = async (req, res, next) => {
        try{
            const trashUser = await user.deleteUsers(req.body);
            res.status(200).json({
                status: true,
                message: `${trashUser.email} has been deleted`,
                data: trashUser
            })
        } catch(e){
            next(createError(e.statusCode, e.message))
        }
    }
}

module.exports = UserController;