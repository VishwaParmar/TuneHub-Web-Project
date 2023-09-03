// Author: Kainat Khan
// Date: July 24, 2023

const express = require('express');

const userController = require('../controllers/users.js');

const router = express.Router();

router.get( '/users', userController.getUsers);
router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);
router.get('/user/:id', userController.getUser);
router.put('/edit/:id', userController.updateUser);
router.put('/changePassword/:id', userController.changePassword);
router.delete('/delete/:id', userController.deleteUser);
module.exports = router;