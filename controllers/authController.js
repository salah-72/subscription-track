import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import bcrypt from 'bcryptjs';
const makeToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRETKEY, {
    expiresIn: process.env.EXPIED_IN,
  });
};

export const signup = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  const token = makeToken(user._id);
  res.status(201).json({
    status: 'success',
    token,
    data: user,
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError('Write email and password', 400));
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return next(new AppError('email or password not correct', 400));

  const token = makeToken(user._id);
  res.status(201).json({
    status: 'success',
    token,
    data: user,
  });
});

export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  )
    token = req.headers.authorization.split(' ')[1];
  if (!token) return next(new AppError('unauthorized'), 401);
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRETKEY);
  const user = await User.findById(decoded.id);
  if (!user) return next(new AppError('you have no access'), 401);

  req.user = user;
  next();
});
