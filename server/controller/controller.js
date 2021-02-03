const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/user");
const { ACCESS_TOKEN } = process.env;

const login = async (req, res) => {
  const { password, email } = req.body;

  try {
    const isUser = await User.findOne({ email });
    if (isUser) {
      const isPassword = await bcrypt.compare(password, isUser.password);
      if (isPassword) {
        const token = jwt.sign(
          { email: isUser.email, id: isUser._id },
          ACCESS_TOKEN,
          { expiresIn: 300 }
        );
        res.status(200).json({ isUser, token });
      } else {
        res.status(500).json("Something Went Wrong");
      }
    } else {
      res
        .status(403)
        .json("you don't Have An Account with the email: " + email);
    }
  } catch (err) {
    console.log(err);
  }
};

const signUp = async (req, res) => {
  console.log("hit");
  console.log(req.body);
  const { firstName, lastName, password, email } = req.body;

  try {
    console.log("hit1");
    const isUser = await User.findOne({ email });
    console.log("hit2");
    if (isUser) {
      res.status(409).json("you Already have an Account With: " + email);
    } else {
      const hashPassword = bcrypt.hash(password, 12);
      console.log("hit3");
      const newUser = {
        firstName: firstName,
        lastName: lastName,
        password: hashPassword,
        email: email,
      };

      const result = await new User(newUser).save();

      // const token = jwt.sign(
      //   { email: isUser.email, id: isUser._id },
      //   ACCESS_TOKEN,
      //   { expiresIn: 300 }
      // );
      console.log(result);

      res.status(200).json({ result: "token" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  login,
  signUp,
};
