require("dotenv").config({ path: "./config.env" });
const express = require("express");

const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const cors = require('cors');

connectDB();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200, // For legacy browser support
    methods: "GET, PUT, POST",
  })
);

app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server running on  ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Server Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
