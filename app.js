const express = require('express');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const subscriptionRouter = require('./routes/subscriptionRoutes');
const app = express();

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Welcome to our website');
});
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/subscription', subscriptionRouter);

module.exports = app;
