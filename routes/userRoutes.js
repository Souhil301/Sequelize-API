const express = require ('express');
const router = express.Router();
const { login, register, getAllUsers, updateUser, deleteUser } = require('../controllers/userController');



router.post('/login', login);
router.post('/register', register);
router.get('/users', getAllUsers);
router.put('/update-profile/:id', updateUser);
router.delete('/delete-user/:id', deleteUser);


module.exports = router;


