var mongoose = require("mongoose");

var TagSchema = mongoose.Schema({
    filename: String,
    tag: String
});

module.exports = mongoose.model("Tag", TagSchema);