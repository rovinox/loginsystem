require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { login, signUp } = require("./controller/controller");
const { auth } = require("./middleware/auth");
var cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

const { SERVER_PORT, dbURI } = process.env;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

// app.get("/home", (res, req) => {
//   const token = req.headers["x-access-token"];
//   if (token) {
//     jwt.verify(token, ACCESS_TOKEN, (err) => {
//       res.json({ isLogin: true });
//       console.log(err);
//     });
//   }
// });
// app.post("/register", (res, req) => {

// });
app.post("/login", login);
app.post("/signUp", signUp);

app.listen(SERVER_PORT, () => console.log(`Listening on ${SERVER_PORT}`));
