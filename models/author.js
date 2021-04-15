const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: String,
    age: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: "{VALUE} is not an integer value."
        }
    }
});

module.exports = mongoose.model("Author", authorSchema);
