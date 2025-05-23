import {Router} from 'express'
import {body} from 'express-validator'
import {registerUser, loginUser} from '../controllers/user.controller.js'

const userRouter = Router()


userRouter.post('/register', [
    body('email').isEmail().withMessage('Invalid Email',),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must be at least 3 characters long')
], registerUser)

userRouter.post('/login', [
    body('email').isEmail().withMessage('Invalid Email',),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
], loginUser)


export default userRouter