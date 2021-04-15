// import graphql
const graphql = require("graphql");
// destructor graphql object and types
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLID
} = graphql;
//import mongoose models
const Book = require("../models/book");
const Author = require("../models/author");

// create a new graphql model by using graphql's ObjectType
const BookType = new GraphQLObjectType({
    // name the model
    name: "Book",
    // give it columns
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        genre: {type: GraphQLString},
        // set a relationship between a book and its author
        author: {
            type: AuthorType,
            resolve(parent, args) {
                // return authors.find((author) => author.id === parent.author_id);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        // set a relationship between an author and all their books
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return books.filter((book) => parent.id === book.author_id);
            }
        }
    })
});

// this is where we define how graphql will make changes to the database
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        // query for creating a new author
        addAuthor: {
            // what data type is being created
            type: AuthorType,
            // what data is needed in order to create a new author
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            // create a new Author (mongoose model) with the values entered in args 
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                // save the author to the database and return its data
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                title: {type: GraphQLString},
                genre: {type: GraphQLString},
                author_id: {type: GraphQLID}
            },
            resolve(parent, args) {
                let author = new Book({
                    title: args.title,
                    genre: args.genre,
                    author_id: args.author_id
                });
                return book.save();
            }
        }
    }
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
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                // code to get data from db / other source
                // return books.find((book) => book.id === args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return books;
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                // return authors.find((author) => author.id === args.id);
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // return authors;
            }
        },
    }
});

// export the schema and the root query
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
