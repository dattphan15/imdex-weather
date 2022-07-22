const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString,GraphQLList } = graphql;
const User = new GraphQLObjectType({
  name: "User",
  type: ["Query"],
  // type:GraphQLList,
  fields: {
    id: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    city: { type: GraphQLString }
  }
});
exports.User = User;