const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Server Root Route
app.get("/", (req, res) => {
  res.send("xTechno Server is Running...");
});

// Server Listener
app.listen(port, () => {
  console.log("Server is running on port:", port);
})