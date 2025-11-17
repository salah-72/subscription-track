const mongoose = require('mongoose');
const User = require('./userModel');

const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  price: {
    type: Number,
    required: [true, 'price is required'],
  },
  currency: {
    type: String,
    required: [true, 'currency is required'],
    enum: {
      values: ['EUR', 'USD', 'EGP', 'SAR'],
      message: 'you can pay only with EUR or USD or EGP or SAR',
    },
  },
  frequency: {
    type: String,
    required: [true, 'frequency is required'],
    enum: {
      values: ['daily', 'weekly', 'monthly', 'annually'],
      message: 'you can pay daily or weekly or monthly or annually',
    },
  },
  category: {
    type: String,
    default: 'entertainment',
  },
  paymentMethod: {
    type: String,
    required: true,
    default: 'Credit Card',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: User,
    required: [true, 'subscription must belong to user'],
  },
  startDate: {
    type: Date,
    default: Date.now(),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
  },
  renewalDate: {
    type: Date,
  },
});

subscriptionSchema.pre('save', function (next) {
  if (this.isNew) this.updatedAt = this.startDate;
  else this.updatedAt = new Date();

  next();
});

subscriptionSchema.pre('save', function (next) {
  if (this.frequency === 'daily')
    this.renewalDate = this.updatedAt.getTime() + 86400000;
  else if (this.frequency === 'weekly')
    this.renewalDate = this.updatedAt.getTime() + 604800000;
  else if (this.frequency === 'monthly')
    this.renewalDate = this.updatedAt.getTime() + 2592000000;
  else this.renewalDate = this.updatedAt.getTime() + 31104000000;

  next();
});

subscriptionSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name',
  });

  next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
