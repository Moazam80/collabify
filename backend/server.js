require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const testRoutes = require("./routes/testRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Collabify API is running 🚀");
});

app.use("/api/test", testRoutes);

const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});