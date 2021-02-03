const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN } = process.env;
const auth = async (res, req, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, ACCESS_TOKEN);
      req.userId = decodedData.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData.sub;
    }
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  auth,
};
