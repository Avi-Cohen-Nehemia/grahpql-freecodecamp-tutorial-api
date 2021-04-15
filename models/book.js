const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: String,
    genre: String,
    author_id: {
        type: Number,
        validate: {
            validator: Number.isInteger,
            message: "{VALUE} is not an integer value."
        }
    }
});

module.exports = mongoose.model("Book", bookSchema);
