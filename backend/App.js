const express = require("express");
const router = express.Router();
const cors = require('cors');
const bcrypt = require('bcrypt');
const request = require('request');
const logger = require('morgan');
const expressJSDocSwagger = require('express-jsdoc-swagger');
const { graphqlHTTP } = require('express-graphql');
const graphql = require("graphql");
const { GraphQLSchema } = graphql;
const { query } = require("./schema/query");
// const { mutation } = require("./schemas/mutations");
const verifyToken =  require('./middleware/auth')
var cookieSession = require('cookie-session')
const cookieParser = require("cookie-parser");

// load .env data into process.env
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const ENV        = process.env.ENV || "development";
const path = require("path");
const app = express();
const usersRouter = require("./routes/users");

app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(logger('dev'));
app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: ["key1"],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use("/api/users", usersRouter);


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
  // Global pattern to find your jsdoc files (multiple patterns can be added in an array)
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
  // You can extend swagger-ui-express config. You can checkout an example of this
  // in the `example/configuration/swaggerOptions.js`
  swaggerUiOptions: {},
  // Multiple options in case you want more than one instance
  multiple: true,
};
expressJSDocSwagger(app)(options);


/**
 * weather schema
 * @typedef {object} Weather
 * @property {string} city.query.required - City name is required
 */

/**
 * GET /weather
 * @summary  weather end point with city name (login token required)
 * @param {Weather} request.query.required - weather info 
 * @security BasicAuth
 * @tags Users
 * @return {object} 200 - weather response
 * @example response - 200 - success response example
 * @return {object} 400 - Bad request response
 */
app.get("/weather", verifyToken, async (req, res) => {
  try {
    if (!req.query.city) {
        return res.status(400).send("city name is required");
    }
    const city = req.query.city
    const weather = await requestWeather(city)    
    return res.status(200).send({"status":true,data:JSON.parse(weather)});
    } catch(err) {
      return err
    }
}) 


const requestWeather = (location) =>{
  promi = new Promise((resolve, reject) => {
      request({uri: `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.API_KEY}`,
          method: 'GET'
        }, (err, res, body) => {
          if (err) { 
            reject(err); 
          }
          if (!res.headersSent) {
            resolve(body) 
          }
      });
  })
  return promi;
}


// All other GET requests not handled before will return our React app
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


module.exports = app;