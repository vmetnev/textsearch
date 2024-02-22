const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const searchController = require("./Controllers/SearchController");

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

app.use(express.static("public"));
app.use((req, res, next) => {
  console.log(req.url);
  console.log(req.query);
  next();
});

app.get("/search", searchController);

app.get("*", async (req, res) => {
  res.json("not found");
});

app.listen(3003, () => {
  console.log("server started at port 3003");
});
