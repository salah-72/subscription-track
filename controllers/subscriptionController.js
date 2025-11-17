const Subscription = require('./../models/subscriptionModel');

exports.createSubscription = async (req, res) => {
  const sub = await Subscription.create(req.body);
  res.status(201).json({
    status: 'success',
    data: sub,
  });
};

exports.getSubscriptions = async (req, res) => {
  const subs = await Subscription.find();
  res.status(200).json({
    status: 'success',
    len: subs.length,
    data: subs,
  });
};

exports.getSubscription = async (req, res) => {
  const subscription = await Subscription.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: subscription,
  });
};

exports.updateSubscription = async (req, res) => {
  const subscription = await Subscription.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: 'success',
    data: subscription,
  });
};

exports.deletesubscription = async (req, res) => {
  const subscription = await Subscription.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    data: null,
  });
};
