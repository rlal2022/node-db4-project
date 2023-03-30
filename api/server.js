const express = require("express");
const recipesRouter = require("./recipes-router");

const server = express();

server.use(express.json());

server.use("/api", recipesRouter);

server.use("*", (req, res) => {
  res.json({ api: "api working" });
});

module.exports = server;
