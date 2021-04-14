const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");

const app = express();

// middleware to tell express to use graphql and what schema to use
app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

app.listen(4000, () => {
    console.log("server started on localhost:4000");
});
