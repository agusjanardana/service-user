var express = require('express');
var router = express.Router();
const usersHandler = require('./handler/users');

router.post('/register', usersHandler.register);
router.post('/login', usersHandler.login);
router.post('/logout', usersHandler.logout);
router.put('/:id', usersHandler.update);
router.get('/:id', usersHandler.getUser);
router.get('/', usersHandler.getUsers);

module.exports = router;
