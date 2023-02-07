const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("cors")());

app.use("/user", require("./routes/user"));
app.use("/chatroom", require("./routes/chatroom"));

const errorHandlers = require("./handlers/errorHandlers");
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);
app.use(errorHandlers.Errors);

module.exports = app;
