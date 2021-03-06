// import graphql
const graphql = require("graphql");
// destructor graphql object and types
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull
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
                // use mongoose methods to search for a specific record
                return Author.findById(parent.author_id);
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
                return Book.find({author_id: parent.id});
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
                // GraphQLNonNull makes args required and will prevent saving incomplete data
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
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
                title: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                author_id: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                let book = new Book({
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
                return Book.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // find returns all when no properties are passed to it
                return Book.find({});
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                return Author.findById(args.id);
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return Author.find({});
            }
        },
    }
});

// export the schema and the root query
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
