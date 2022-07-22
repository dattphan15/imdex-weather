const express = require("express");
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt');
const request = require('request');
const expressJSDocSwagger = require('express-jsdoc-swagger');
const { graphqlHTTP } = require('express-graphql');
const graphql = require("graphql");
const { GraphQLSchema } = graphql;
const { query } = require("./schema/query");
// const { mutation } = require("./schemas/mutations");
const auth =  require('./middleware/auth')




// load .env data into process.env
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const ENV        = process.env.ENV || "development";

const app = express();
app.use(cors())
app.use(express.json());


const schema = new GraphQLSchema({
  query
  // mutation
});

app.use('/graphql', graphqlHTTP({  schema: schema,  graphiql: true}));

const options = {
  info: {
    version: '1.0.0',
    title: 'Weather Api Backend',
    description:'',
    license: {
      name: 'MIT',
    },
  },
  security: {
    BasicAuth: {
      type: 'http',
      scheme: 'basic',
    },
  },
  baseDir: __dirname,
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: './**/*.js',
  // URL where SwaggerUI will be rendered
  swaggerUIPath: '/api-docs',
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
  // Expose Open API JSON Docs documentation in `apiDocsPath` path.
  exposeApiDocs: false,
  // Open API JSON Docs endpoint.
  apiDocsPath: '/v3/api-docs',
  // Set non-required fields as nullable by default
  notRequiredAsNullable: false,
  // You can customize your UI options.
  // you can extend swagger-ui-express config. You can checkout an example of this
  // in the `example/configuration/swaggerOptions.js`
  swaggerUiOptions: {},
  // multiple option in case you want more that one instance
  multiple: true,
};
expressJSDocSwagger(app)(options);

const db = require("./db");

const queryInsert = async (username, password, city) =>{
  let query = "INSERT INTO users (username, password, city) VALUES ($1, $2, $3)";
  return new Promise((resolve, reject)=>{
      db.query(query,[ username, password, city ],(err,res)=>{
          if(err) {
            return reject(err);
          }
          console.log("HELLO TEST")
          return resolve(res);
      });
  });
};

/**
 * createUser schema
 * @typedef {object} register
 * @property {string} username.required - The mobile
 * @property {string} password.required - The mobile
 * @property {string} city.required - The mobile
 */

/**
 * POST /register
 * @summary  register user uisng username, password and city
 * @param {register} request.body.required - register info
 * @security BasicAuth
 * @tags Users
 * @return {object} 201 - register response
 * @return {object} 400 - Bad request response
 */

app.post("/register", async (req, res) => {
  try {
    const { username, password, city } = req.body;
    if (!(username && password && city)) {
      res.status(400).send("All input is required");
    }
    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await db.query(`SELECT * FROM users WHERE username = '${ username }'`);
    console.log("OLD USER: >>>> ", oldUser.rowCount)
    if (oldUser.rowCount > 0) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    encryptedPassword = await bcrypt.hash(password, 10);

    await queryInsert( username, encryptedPassword, city )

    const token = jwt.sign(
      { username, city },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    console.log("TOKEN: >>>> ", token)
    let user_token = { username: username, city: city, token: token}

    res.status(201).json(user_token);
  } catch (err) {
    console.log(err);
  }
});


/**
 * login schema
 * @typedef {object} Login
 * @property {string} username.required -
 * @property {string} password.required
 */

/**
 * POST /login
 * @summary  login end point with username and password
 * @param {Login} request.body.required - login info 
 * @security BasicAuth
 * @tags Users
 * @return {object} 200 - login response
 * @example response - 200 - success response example
 *  {
 *   "username": "username",
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtldmluZmFrZTEzIiwiY2l0eSI6IlZhbmNvdXZlciIsImlhdCI6MTY1ODQ3MTY4NywiZXhwIjoxNjU4NDc4ODg3fQ.0BD1O4bDEUgoq4UjopzB_BDNOSPQZWjL3VmTriAflco"
 *  }
 * @return {object} 400 - Bad request response
 */

app.post("/login", async (req, res) => {
  try {
    const { username, password} = req.body;
    if (!(username && password )) {
      res.status(400).send("All input is required");
    }
    
    const user = await db.query(`SELECT * FROM users WHERE username = '${ username }'`);
    
    if ( user.rowCount == 1 ) {
      if( await bcrypt.compare(password, user.rows[0].password) ){

        const token = jwt.sign(
          { username,city:user.rows[0].city },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        console.log("TOKEN: >>>> ", token)
        let user_token = { username: username,token: token }
    
        return res.status(200).json(user_token);

      }
      return res.status(409).send("Invalid Credentials");
    }
     return res.status(409).send("User Not Exist");

  } catch (err) {
    console.log(err);
  }
});

/**
 * weather schema
 * @typedef {object} Weather
 * @property {string} city.query.required - City name is required
 */

/**
 * GET /weather
 * @summary  weather end point with city name
 * @param {Weather} request.query.required - weather info 
 * @security BasicAuth
 * @tags Users
 * @return {object} 200 - weather response
 * @example response - 200 - success response example
 * @return {object} 400 - Bad request response
 */

app.get("/weather", auth, async (req, res) => {
  try {
    if (!req.query.city) {
        return res.status(400).send("city name is required");
    }
    const city = req.query.city
    const weather = await requestFun(city)
    // console.log('weather',weather);
    return res.status(200).send({"status":true,data:JSON.parse(weather)});
  } catch(err) {
  }
}) 


const requestFun = (location) =>{
    
  const promi = new Promise((resolve, reject) => {
      request({uri: `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.API_KEY}`,
          method: 'GET'
        }, (err, res, body) => {
          if (err) { reject(err); }
          resolve(body) 
      });
  })
  return promi;

}
// All other GET requests not handled before will return our React app
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});