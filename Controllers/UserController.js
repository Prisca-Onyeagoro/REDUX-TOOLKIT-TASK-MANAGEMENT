import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../model/Usermodel.js';
// generate token
const GenerateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

export const RegisterUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //  validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Fill Up the empty fields');
  }
  //  checkimg if the user exist
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exist, Kindly login');
  }
  //  hashing and salting the password
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, salt);

  //  creating the user
  const user = await User.create({ name, email, password: hashedpassword });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: GenerateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('INVALID USER DATA');
  }
});
export const LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //  validation
  if (!email || !password) {
    res.status(400);
    throw new Error('Fill up the empty fields');
  }
  // check for the user email
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error('Invalid Credentials');
  }
  // validating the password
  const isMatch = await bcrypt.compare(password, user.password);
  if (user && isMatch) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: GenerateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid Credentials');
  }
});

export const Getme = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});
