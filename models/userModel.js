const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please write your name'],
    },
    email: {
      type: String,
      unique: true,
      validate: [validator.isEmail, 'provide valid email'],
      required: [true, 'email is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: 8,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'PasswordConfirm is required'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'password not match password confirm',
      },
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.virtual('subscriptions', {
  ref: 'Subscription',
  foreignField: 'user',
  localField: '_id',
});

const User = mongoose.model('User', userSchema);
module.exports = User;
