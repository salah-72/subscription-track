const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

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
