const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());

app.use(express.json());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.status(200).json({
    success: true,
    data: commentsByPostId[req.params.id] || [],
  });
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { comment } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({
    id: commentId,
    comment,
  });

  commentsByPostId[req.params.id] = comments;

  await axios
    .post("http://localhost:4005/events", {
      type: "CommentCreated",
      data: {
        id: commentId,
        comment,
        postId: req.params.id,
      },
    })
    .catch((err) => {
      console.log(err.message);
    });

  res.status(201).json({
    success: true,
    message: "Comment posted successfully",
    data: comments,
  });
});

app.post("/events", (req, res) => {
  console.log(`Received Events`, req.body.type);

  res.status(200).json({
    success: true,
  });
});

app.listen(4001, () => {
  console.log(`Comment Server is running at PORT 4001`);
});
