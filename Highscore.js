var mongoose = require("mongoose");

var Highscore = mongoose.model("Mongoose", {
    score: {
        type: Number,
        required: false,
        minLength: 1,
        trim: true,
        default: -1
    },
    username: {
        type: String,
        required: false,
        minLength: 1,
        trim: true,
        default: "Admin"
    }
});

module.exports = { Highscore };