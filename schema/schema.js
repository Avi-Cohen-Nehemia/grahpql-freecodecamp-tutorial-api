// import graphql
const graphql = require("graphql");
// destructor graphql object and types
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLSchema } = graphql;

// dummy database
const books = [
    {
        id: 1,
        title: "Attack on Titan",
        genre: "Fantasy"
    },
    {
        id: 2,
        title: "Kengan Ashura",
        genre: "Action"
    },
    {
        id: 3,
        title: "7 Deadly Sins",
        genre: "Fantasy"
    },
];

// create a new model
const BookType = new GraphQLObjectType({
    // name the model
    name: "Book",
    // give it columns
    fields: () => ({
        id: {type: GraphQLInt},
        title: {type: GraphQLString},
        genre: {type: GraphQLString},
    })
});

// this is where we define our different queries and what data they fetch
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            // define what type of data will return
            type: BookType,
            // define what info is needed to execute the query
            // for example, we need to provide an id so graphql know which book to fetch
            args: {
                id: {type: GraphQLInt}
            },
            resolve(parent, args) {
                // code to get data from db / other source
            }
        }
    }
});

// export the schema and the root query
module.exports = new GraphQLSchema({
    query: RootQuery
});
