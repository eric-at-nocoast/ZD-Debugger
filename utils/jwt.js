const jwt = require('jsonwebtoken');
const createError = require('http-errors');

require('dotenv').config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

module.exports = {
	signAccessToken(payload) {
		return jwt.sign({payload}, accessTokenSecret, { expiresIn: '1h' });
	},
	
	verifyAccessToken(token) {
		return new Promise((resolve, reject) => {
			jwt.verify(token, accessTokenSecret, (err, payload) => {
				if (err) {
					const message =
						err.name == 'JsonWebTokenError' ? 'Unauthorized' : err.message;
					return reject(createError.Unauthorized(message));
				}
				resolve(payload);
			});
		});
	},
};
