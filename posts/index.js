const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser());

const posts = {};

app.get("/posts", (req, res, next) => {
  res.send(posts);
});

app.post("/posts", async (req, res, next) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  const newPost = {
    id,
    title,
  };

  posts[id] = newPost;

  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: newPost,
  });

  res.status(200).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Event Received", req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});
