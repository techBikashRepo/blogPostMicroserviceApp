const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.status(200).json({
    success: true,
    data: { ...posts },
  });
});
app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };

  await axios
    .post("http://localhost:4005/events", {
      type: "PostCreated",
      data: {
        id,
        title,
      },
    })
    .catch((err) => {
      console.log(err.message);
    });

  res.status(201).json({
    success: true,
    message: "Post created successfully",
    data: posts[id],
  });
});
app.post("/events", (req, res) => {
  console.log(`Received Events`, req.body.type);

  res.status(200).json({
    success: true,
  });
});

app.listen(4000, () => {
  console.log(`POSTS server running at PORT : 4000`);
});
