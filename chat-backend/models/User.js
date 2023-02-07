const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: "username is required!",
    },
    firstname: {
      type: String,
      required: "firstname is required!",
    },
    lastname: {
      type: String,
      required: "lastname is required!",
    },
    password: {
      type: String,
      required: "password is required!",
    },
    createon: {
      type: Date,
      required: true,
    },
  }
);

module.exports = mongoose.model("User", userSchema);
