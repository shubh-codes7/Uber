import mongoose from 'mongoose'
import Captain from '../models/captain.model.js'
import { createCaptain } from '../services/captain.service.js'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'


export async function registerCaptain (req, res) {
  const errors = validationResult(req) 
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const { fullname, email, password, vehicle } = req.body

  //check if captain already exists
  const captainAlreadyExists = await Captain.findOne({email})
  if(captainAlreadyExists){
    return res.status(409).json({message: "Captain already exists"})
  }

  try {
    //using createCaptain service to create new captain
    const captain = await createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType
    })

    const token = captain.generateAuthToken()
    res.cookie('token', token)

    return res.status(201).json({ captain })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export async function loginCaptain(req, res){
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(422).json({errors: errors.array()})
  }

  const {email, password} = req.body

  const captain = await Captain.findOne({email}).select('+password')

  if(!captain){
    return res.status(401).json({message: "Captain does not exists"})
  }
  const isMatch = await captain.comparePassword(password)
  if(!isMatch){
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = captain.generateAuthToken()
  res.cookie("token", token)
  return res.status(200).json({captain, token})
}

export async function logoutCaptain(req, res){
  res.clearCookie('token')
  res.status(200).json({message: "Logged out successfully"})
}

export async function getCaptainProfile(req, res){
  res.status(200).json({captain: req.captain})
}