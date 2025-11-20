import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

import app from './app.js';
import mongoose from 'mongoose';

// console.log(app.get("env"));

mongoose
  .connect(process.env.DB_CONNECTION2)
  .then(() => {
    console.log('good connection to DB');
  })
  .catch((err) => console.log(`DB error: ${err}`));

app.listen(3000, () => {
  console.log('we are listenning at port 3000');
});
