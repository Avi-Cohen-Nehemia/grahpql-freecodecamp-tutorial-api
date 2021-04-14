// import graphql
const graphql = require("graphql");
// destructor graphql object and types
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLSchema } = graphql;

// dummy database
const books = [
    {
        id: 1,
        title: "Attack on Titan",
        genre: "Fantasy",
        author_id: 2
    },
    {
        id: 2,
        title: "Kengan Ashura",
        genre: "Action",
        author_id: 3
    },
    {
        id: 3,
        title: "7 Deadly Sins",
        genre: "Fantasy",
        author_id: 1
    },
];

const authors = [
    {
        id: 1,
        name: "Avi",
        age: 30
    },
    {
        id: 2,
        name: "Zoe",
        age: 31
    },
    {
        id: 3,
        name: "Blueberry",
        age: 1
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
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return authors.find((author) => author.id === parent.author_id)
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: {type: GraphQLInt},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
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
                return books.find((book) => book.id === args.id);
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {type: GraphQLInt}
            },
            resolve(parent, args) {
                return authors.find((author) => author.id === args.id);
            }
        },
    }
});

// export the schema and the root query
module.exports = new GraphQLSchema({
    query: RootQuery
});
