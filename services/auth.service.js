const { PrismaClient } = require('@prisma/client');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');
const prisma = new PrismaClient();

class AuthService {
	static async register(data) {
		data.password = bcrypt.hashSync(data.password, 8);
		let user = await prisma.users.create({
			data,
		});
		data.accessToken = await jwt.signAccessToken(user.email);
		return data;
	}

	static async login(data) {
		const { email, password } = data;
		const user = await prisma.users.findUnique({
			where: {
				email,
			},
		});
		if (!user) {
			throw createError.NotFound(
				'No existing user with that email address exists. Please register.'
			);
		}
		const checkPassword = bcrypt.compare(password, user.password);
		if (!checkPassword)
			throw createError.Unauthorized(
				'Login info is incorrect. Please try again.'
			);
		delete user.password;
		const accessToken = await jwt.signAccessToken(user.email);
		return { ...user, accessToken };
	}

    static async someUsers() {
        const Users = await prisma.users.findMany();
        return Users;
    }
}

module.exports = AuthService;
