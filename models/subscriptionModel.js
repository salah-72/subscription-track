import mongoose from 'mongoose';
import User from './userModel.js';

const subscriptionSchema = new mongoose.Schema(
  {
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
    status: {
      type: String,
      enum: ['active', 'cancelled', 'expired'],
      default: 'active',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (val) {
          return val <= new Date();
        },
        message: 'start date must be in the past',
      },
    },
    renewalDate: {
      type: Date,
      // validate: {
      //   validator: function (val) {
      //     return val > this.startDate;
      //   },
      //   message: 'start date must be after start date',
      // },
    },
  },
  { timestamps: true } // add createdAt , updatedAt
);

subscriptionSchema.pre('save', function (next) {
  if (this.frequency === 'daily')
    this.renewalDate = this.startDate.getTime() + 86400000;
  else if (this.frequency === 'weekly')
    this.renewalDate = this.startDate.getTime() + 604800000;
  else if (this.frequency === 'monthly')
    this.renewalDate = this.startDate.getTime() + 2592000000;
  else this.renewalDate = this.startDate.getTime() + 31104000000;

  if (this.renewalDate < new Date()) this.status = 'expired';
  next();
});

subscriptionSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name email',
  });

  next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
