const Subscription = require('./../models/subscriptionModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createSubscription = catchAsync(async (req, res, next) => {
  const sub = await Subscription.create(req.body);
  res.status(201).json({
    status: 'success',
    data: sub,
  });
});

exports.getSubscriptions = catchAsync(async (req, res, next) => {
  const subs = await Subscription.find();
  res.status(200).json({
    status: 'success',
    len: subs.length,
    data: subs,
  });
});

exports.getSubscription = catchAsync(async (req, res, next) => {
  const subscription = await Subscription.findById(req.params.id);
  if (!subscription)
    return next(new AppError('no subscription with this id', 404));
  res.status(200).json({
    status: 'success',
    data: subscription,
  });
});

exports.updateSubscription = catchAsync(async (req, res, next) => {
  const subscription = await Subscription.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!subscription)
    return next(new AppError('no subscription with this id', 404));
  res.status(200).json({
    status: 'success',
    data: subscription,
  });
});

exports.deletesubscription = catchAsync(async (req, res, next) => {
  const subscription = await Subscription.findByIdAndDelete(req.params.id);
  if (!subscription) return next(new AppError('no subscription with this id'));
  res.status(200).json({
    status: 'success',
    data: null,
  });
});
