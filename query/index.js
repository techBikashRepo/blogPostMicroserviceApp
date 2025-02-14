const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const posts = {};

app.get("/posts", (req, res) => {
  console.log("GET posts==>", posts);
  res.status(200).json({
    success: true,
    data: posts,
  });
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, comment, postId } = data;
    const post = posts[postId];
    post.comments.push({ id, comment });
  }

  res.status(200).json({
    success: true,
  });
});

const PORT = 4002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
