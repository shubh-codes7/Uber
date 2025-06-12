import {Router} from 'express'
import {body} from 'express-validator'
import {registerUser, loginUser, getUserProfile, logoutUser} from '../controllers/user.controller.js'
import {authUser} from '../middlewares/auth.middleware.js'

const userRouter = Router()


userRouter.post('/register', [
    body('email').isEmail().withMessage('Invalid Email',),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must be at least 3 characters long')
], registerUser)

//removed request validation to make frontend error handling easy
userRouter.post('/login', loginUser)


userRouter.get('/profile', authUser, getUserProfile)

userRouter.get('/logout',authUser ,logoutUser)


export default userRouter