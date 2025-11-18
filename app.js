import express from 'express';
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';
import subscriptionRouter from './routes/subscriptionRoutes.js';
import AppError from './utils/appError.js';
import errorMiddleware from './middleWare/errorMiddleware.js';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'too many requests from same IP, please try again after an hour',
});

app.use('/api', limiter);

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

export default app;
