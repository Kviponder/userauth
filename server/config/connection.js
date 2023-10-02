const mongoose = require("mongoose");

ongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/userauth", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
