import User from "../models/user.model.js"
import jwt from 'jsonwebtoken'

export default async function authUser(req, res, next){
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
  if(!token){
    return res.status(401).json({message: 'Unauthorized'})
  }

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded._id)

    if(!user){
      throw new Error('Unauthorized')
    }

    req.user = user
    return next()
  }catch(err){
    return res.status(401).json({message: 'Unauthorized'})
  }
}