import User from "../models/user.model.js"
import Captain from "../models/captain.model.js"
import jwt from 'jsonwebtoken'

export async function authUser(req, res, next){
  const token = req.cookies.userToken
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


export async function authCaptain(req, res, next){
  const token = req.cookies.captainToken
  if(!token){
    return res.status(401).json({message: "Unauthorized"})
  }

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const captain = await Captain.findById(decoded._id)

    if(!captain){
      throw new Error('Unauthorized')
    }

    req.captain = captain
    next()

  }catch(error){
    throw new Error('Unauthorized')
  }
}