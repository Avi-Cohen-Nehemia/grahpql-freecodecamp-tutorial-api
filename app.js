const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();

// connect to mongoDB database
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb+srv://Avi:0549322873@digitallibrary.iuzlk.mongodb.net/digitalLibrary?retryWrites=true&w=majority");
mongoose.connection.once("open", () => {
    console.log("connected to database successfully");
});

// middleware to tell express to use graphql and what schema to use
app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

app.listen(4000, () => {
    console.log("server started on localhost:4000");
});
