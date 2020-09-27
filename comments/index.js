const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res, next) => {
  const post = commentsByPostId[req.params.id];
  res.send(post || []);
});

app.post("/posts/:id/comments", async (req, res, next) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const newComment = { id: commentId, content };
  const comments = [...(commentsByPostId[req.params.id] || []), newComment];

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: { ...newComment, postId: req.params.id },
  });

  commentsByPostId[req.params.id] = comments;
  res.status(200).send(comments);
});

app.post("/events", (req, res) => {
  console.log("Event Received", req.body.type);
  res.send({});
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
