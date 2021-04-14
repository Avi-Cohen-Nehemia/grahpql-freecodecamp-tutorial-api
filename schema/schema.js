// import graphql
const graphql = require("graphql");

// destructor graphql object and types
const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;

// create a new model
const BookType = new GraphQLObjectType({
    // name the model
    name: "Book",
    // give it columns
    fields: () => ({
        id: {type: GraphQLInt},
        title: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {type: GraphQLString},
    })
});