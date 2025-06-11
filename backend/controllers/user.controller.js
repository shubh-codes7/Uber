import User from "../models/user.model.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";

export async function registerUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  
  const userAlreadyExists = await User.findOne({email})
  if (userAlreadyExists) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const hashedPassword = await User.hashPassword(password);

  try {
    const user = await createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });

    const token = user.generateAuthToken();
    res.cookie('userToken', token, {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      path: '/'
    });
    return res.status(201).json( user );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


export async function loginUser(req, res) {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  
  const user = await User.findOne({email}).select('+password');

  if(!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isMatch = await user.comparePassword(password);
  if(!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  const token = user.generateAuthToken();
  res.cookie('userToken', token)
  return res.status(200).json({ user, token });
}    


export async function getUserProfile(req, res) {
  res.json({ user: req.user });
}


export async function logoutUser(req, res) {
  res.clearCookie('UserToken');
  return res.status(200).json({ message: 'Logged out successfully' });
}




