import Router from 'express'
import { logoutCaptain, registerCaptain, getCaptainProfile, loginCaptain } from '../controllers/captain.controller.js'
const captainRouter = Router()
import { body } from 'express-validator'
import {authCaptain} from '../middlewares/auth.middleware.js'


captainRouter.post('/register', [
  body('email').isEmail().withMessage('Invalid Email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
  body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
  body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate Number must be at least 3 characters long'),
  body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
  body('vehicle.vehicleType').isIn(['car', 'auto', 'motorcycle']).withMessage('Vehicle type must be either car, bike, or truck')
], registerCaptain)

captainRouter.post('/login', [
  body('email').isEmail().withMessage('Invalid Email'),
  body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long')
], loginCaptain)

captainRouter.get('/profile',authCaptain, getCaptainProfile)
captainRouter.get('/logout',authCaptain, logoutCaptain)

export default captainRouter 