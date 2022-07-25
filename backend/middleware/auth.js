const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  // const authHeader = req.headers['authorization']
  // const token = authHeader && authHeader.split(' ')[1]

  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET_KEY, (err, user) => {
      console.log("DECODED ERROR: >>>> ", err)
      if (err) {
        return res.sendStatus(403)
      }
      console.log("VERIFY TOKEN: USER >>>> ", user)
    });
    console.log("VERIFY TOKEN: DECODED >>>> ", decoded)
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;