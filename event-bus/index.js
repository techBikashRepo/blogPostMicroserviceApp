const express = require("express");
const axios = require("axios");
const PORT = 4005;

const app = express();
app.use(express.json());

app.post("/events", (req, res) => {
  const event = req.body;

  axios.post("http://localhost:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://localhost:4001/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://localhost:4002/events", event).catch((err) => {
    console.log(err.message);
  });

  res.status(200).json({
    success: true,
  });
});

app.listen(PORT, () => {
  console.log(`Event Bus Server is running at PORT ${PORT}`);
});
