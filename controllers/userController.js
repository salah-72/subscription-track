import User from './../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find().select('-password');
  res.status(200).json({
    status: 'success',
    len: users.length,
    data: users,
  });
});

export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id)
    .populate('subscriptions')
    .select('-password');
  if (!user) return next(new AppError('no user with this id', 404));

  res.status(200).json({
    status: 'success',
    data: user,
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) return next(new AppError('no user with this id', 404));
  res.status(200).json({
    status: 'success',
    data: user,
  });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return next(new AppError('no user with this id', 404));

  res.status(200).json({
    status: 'success',
    data: null,
  });
});
