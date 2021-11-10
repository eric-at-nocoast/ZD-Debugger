const router = require('express').Router();
const user = require('../controllers/user.controller');
const auth = require('../controllers/auth.controller');


router.get('/', user.someUsers);
router.post('/', auth.register);
router.delete('/', user.deleteUser);

module.exports = router