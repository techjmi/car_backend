const express= require('express')
const { postData, signIn, fetchUser, handleLogout } = require('../controllers/user_controller')
const verifyToken = require('../utility/verifyuser')
const router= express.Router()
// console.log('verifyToken is', verifyToken);
// console.log('fetchUser is', fetchUser);

router.post('/signup', postData) 
router.post('/signin', signIn)
router.post('/logout',verifyToken, handleLogout)
router.get('/me', verifyToken,fetchUser)
module.exports = router