const express= require('express')
const { post_Car, get_car, get_userCar, update_car, delete_car, details } = require('../controllers/car_controller')
const verifyToken = require('../utility/verifyuser')
console.log(verifyToken)
const router= express.Router()
router.post('/create',verifyToken, post_Car)
router.get('/car_list',get_car)
router.get('/user_car_list', verifyToken,get_userCar)
router.put('/edit/:id',verifyToken, update_car)
router.delete('/delete/:id', verifyToken, delete_car)
router.get('/car-details/:id', details);
module.exports= router