const router = require('express').Router();
const user = require('../controllers/auth.controller');
const auth = require('../middlewares/auth');

router.get('/', async (req, res, next) => {
	res.send({ message: 'Users api is working 🚀' });
});

// Create new user
router.post('/register', user.register);

// Login user
router.post('/login', user.login);

// List all users
router.get('/list', user.all);

module.exports = router;
