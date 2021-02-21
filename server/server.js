require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { login, signUp } = require("./controller/controller");
const { auth } = require("./middleware/auth");
var cors = require("cors");
const AWS = require("aws-sdk");
const fileType = require("file-type");
const bluebird = require("bluebird");
const multiparty = require("multiparty");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/../build`));

const { SERVER_PORT, dbURI, ACCESS_ID, SECRET_KEY, BUCKET_S3 } = process.env;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

AWS.config.update({
  accessKeyId: ACCESS_ID,
  secretAccessKey: SECRET_KEY,
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();

// abstracts function to upload a file returning a promise
const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: "public-read",
    Body: buffer,
    Bucket: BUCKET_S3,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`,
  };
  return s3.upload(params).promise();
};
// Define POST route
app.post("/test-upload", (request, response) => {
  console.log("hit");
  const form = new multiparty.Form();
  form.parse(request, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = fileType(buffer);
      const timestamp = Date.now().toString();
      const fileName = `bucketFolder/${timestamp}-lg`;
      const data = await uploadFile(buffer, fileName, type);
      return response.status(200).send(data);
    } catch (error) {
      return response.status(400).send(error);
    }
  });
});

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
