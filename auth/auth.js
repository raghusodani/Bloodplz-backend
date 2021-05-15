var mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Anonymous:w57YgnbU09HnvYKY@cluster0.xxql3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});