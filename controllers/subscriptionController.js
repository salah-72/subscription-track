import Subscription from '../models/subscriptionModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import { workflowClient } from '../utils/upstash.js';

export const createSubscription = catchAsync(async (req, res, next) => {
  const subscription = await Subscription.create({
    ...req.body,
    user: req.user._id,
  });

  const { workflowRunId } = await workflowClient.trigger({
    url: 'http://127.0.0.1:3000/api/v1/workflows/subscription/reminder',
    body: {
      subscriptionId: subscription._id,
    },
    headers: {
      'content-type': 'application/json',
    },
    retries: 0,
  });
  res.status(201).json({
    status: 'success',
    data: { subscription, workflowRunId },
  });
});

export const getSubscriptions = catchAsync(async (req, res, next) => {
  const subs = await Subscription.find();
  res.status(200).json({
    status: 'success',
    len: subs.length,
    data: subs,
  });
});

export const getSubscription = catchAsync(async (req, res, next) => {
  const subscription = await Subscription.findById(req.params.id);
  if (!subscription)
    return next(new AppError('no subscription with this id', 404));
  res.status(200).json({
    status: 'success',
    data: subscription,
  });
});

export const getUserSubs = catchAsync(async (req, res, next) => {
  const mySubs = await Subscription.find({ user: req.user._id });
  res.status(200).json({
    status: 'success',
    data: mySubs,
  });
});

export const updateSubscription = catchAsync(async (req, res, next) => {
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

export const deletesubscription = catchAsync(async (req, res, next) => {
  const subscription = await Subscription.findByIdAndDelete(req.params.id);
  if (!subscription) return next(new AppError('no subscription with this id'));
  res.status(200).json({
    status: 'success',
    data: null,
  });
});
