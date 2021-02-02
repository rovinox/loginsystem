require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const { SERVER_PORT, dbURI, ACCESS_TOKEN } = process.env;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.get("/home", (res, req) => {
  const token = req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, ACCESS_TOKEN, (err) => {
      res.json({ isLogin: true });
      console.log(err);
    });
  }
});
// app.post("/register", (res, req) => {
//   const { firstName, lastName, password, email } = req.body;
//   const user = {
//     firstName,
//     lastName,
//     password,
//     email,
//   };
// });
app.post("/login", (res, req) => {
  const { password, email } = req.body;

  const user = {
    password,
    email,
  };
  console.log(user);
  res.statusCode(200).json(user);

  // const token = jwt.sign(user, ACCESS_TOKEN, { expiresIn: 300 });
  //res.json({ token });
  // maybe sens
});

app.post("/logout", (res, req) => {
  const token = req.headers["x-access-token"];

  jwt.destroy(token);
});

app.listen(SERVER_PORT, () => console.log(`Listening on ${SERVER_PORT}`));
