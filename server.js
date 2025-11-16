const app = require("./app");

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

console.log(app.get("env"));

app.listen(3000, () => {
  console.log("we are listenning at port 3000");
});
