const jwt = require("jsonwebtoken");
const config = process.env;


const verifyToken = (req, res, next) => {

  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    req.user = jwt.verify(token, config.JWT_SECRET_KEY, (err, user) => {
      // console.log("DECODED ERROR: >>>> ", err)
      // if (err) {
      //   return res.sendStatus(403)
      // }
    });
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;