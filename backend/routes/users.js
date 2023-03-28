const express = require('express');
const router = express.Router();
const verifyToken =  require('../middleware/auth')
const db = require("../db");
const jwt = require('jsonwebtoken');
// use bcrypt to hash passwords
const bcrypt = require('bcrypt');

const {
  getUserByUsername,
  getUsers,
  addUser,
} = require("../db/helpers/user-queries");


router.get("/", (req, res) => {
  getUsers()
    .then((data) => 
      // console.log("GET USERS DATA >>>> ", data),
      res.status(200).json(data)
    )
    .catch((err) => res.status(500).json({ error: err.message }));
});


// Show details of a user
router.get("/:id", (req, res) => {
  const userId = Number(req.params);

  getUser(userId)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ error: err.message }));
});


/**
 * login schema
 * @typedef {object} Login
 * @property {string} username.required
 * @property {string} password.required
 */

/**
 * POST /login
 * @summary  login end point with username and password
 * @param {Login} request.body.required - login info 
 * @security BasicAuth
 * @tags Users
 * @return {object} 200 - login response
 * @example response - 200 - success
 *  {
 *   "username": "username",
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtldmluZmFrZTEzIiwiY2l0eSI6IlZhbmNvdXZlciIsImlhdCI6MTY1ODQ3MTY4NywiZXhwIjoxNjU4NDc4ODg3fQ.0BD1O4bDEUgoq4UjopzB_BDNOSPQZWjL3VmTriAflco"
 *  }
 * @return {object} 400 - Bad request
 */

 router.post("/login", async (req, res) => {
  console.log("USERS ROUTE LOGIN: REQ >>>> ", req.body)
  try {
    // Get user input
    const { username, password } = req.body;
    // Validate user input
    if (!(username && password )) {
      res.status(400).send("All input is required");
    }
    const userQuery = await db.query(`SELECT * FROM users WHERE username = '${ username }'`);
    // Validate if user exist in our database
    if ( userQuery.rowCount == 1 ) {
      const user = userQuery.rows[0]
      if ( await bcrypt.compare(password, user.password) ) {
        const userToken = jwt.sign({ username, city: user.city }, process.env.JWT_SECRET_KEY, { expiresIn: "2h" });
        user.token = userToken
        req.session.user_id = user.id
        return res.status(200).json(user.token);
      }
      return res.status(409).send("Invalid Credentials");
    }
     return res.status(409).send("User Doesn't Exist");
  } catch (err) {
    console.log(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session = null;
  res.send(null);
});


/**
 * register schema
 * @typedef {object} Register
 * @property {string} username.required
 * @property {string} password.required
 * @property {string} city.required
 */

/**
 * POST /register
 * @summary  register user using username, password and city
 * @param {Register} request.body.required - register info
 * @security BasicAuth
 * @tags Users
 * @return {object} 201 - Created
 * @example response - 201 - Created
 *  {
 *       "username": "kevinfake15",
 *       "city": "Vancouver",
 *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtldmluZmFrZTE1IiwiY2l0eSI6IlZhbmNvdXZlciIsImlhdCI6MTY1ODUxNzM4OCwiZXhwIjoxNjU4NTI0NTg4fQ.n_lfFk2QNYzcILEvIO4HPNdxxkvecnYGDiRkPGFnKlk"
 *  }
 * @return {object} 400 - Bad request
 * @example response - 400 - Bad request
 *  { "status": "Please verify you've entered all the required information." }
 * @return {object} 409 - User exists
 * @example response - 409 - User exists
 *  { "status": "User Already Exists. Please Login." }
 */

 router.post("/register", async (req, res) => {
  try {
    const { username, password, city } = req.body;
    if (!(username && password && city)) {
      res.status(400).send({"status": "Please verify you've entered all the required information." });
    }

    // Validate if user exists in our database
    const oldUser = await db.query(`SELECT * FROM users WHERE username = '${ username }'`);
    if (oldUser.rowCount > 0) {
      return res.status(409).send({ "status": "User Already Exists. Please Login." });
    }
    encryptedPassword = await bcrypt.hash(password, 10);
    await addUser( username, encryptedPassword, city )
    const token = jwt.sign({ username, city }, process.env.JWT_SECRET_KEY, { expiresIn: "2h" });
    let user_token = { username: username, city: city, token: token }

    getUserByUsername(username)
      .then(user => {
        req.session.user_id = user.id
      })
    res.status(201).json(user_token);
  } catch (err) {
    console.log(err);
  }
});

// Authenticate user
router.post("/authenticate", (req, res, next) => {
  verifyToken(req, res, next)
});


module.exports = router;