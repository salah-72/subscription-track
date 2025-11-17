const express = require('express');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const subscriptionRouter = require('./routes/subscriptionRoutes');
const AppError = require('./utils/appError');
const errorMiddleware = require('./middleWare/errorMiddleware');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to our website');
});
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/subscription', subscriptionRouter);

app.use((req, res, next) => {
  next(new AppError('The URL not found', 404));
});

app.use(errorMiddleware);

module.exports = app;
