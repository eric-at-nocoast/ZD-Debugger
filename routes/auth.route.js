const router = require('express').Router();
const auth = require('../controllers/auth.controller');


router.get('/', async (req, res) => {
	res.send({ message: 'Users api is working 🚀' });
});

// Create new user
router.post('/register', auth.register);

// Login user
router.post('/login', auth.login);


module.exports = router;
