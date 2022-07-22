// const { db } = require("./pgAdopter");
const  db  = require("../db");
const { GraphQLObjectType, GraphQLID } = require("graphql");
const { User } = require("./type");
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  type: "Query",
  fields: {
    users: {
      type: User,
      resolve(parentValue, args) {
        const query = `SELECT * FROM users`;
        // const values = [args.id];
        return db
          .query(query)
          .then(res => {  return res.rows[0]; })
          .catch(err => err);
      }
    },
    user: {
      type: User,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        const query = `SELECT * FROM users WHERE id=$1`;
        const values = [args.id];
        return db
          .query(query,values)
          .then(res => {  return res.rows[0]; })
          .catch(err => err);
      }
    }    
  }
});
exports.query = RootQuery;