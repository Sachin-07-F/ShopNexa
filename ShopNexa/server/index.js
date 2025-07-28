// // import express
// const express = require("express");

// // initialize express
// const app = express();
// const dotenv = require("dotenv");
// dotenv.config();

// // port number
// const port = process.env.PORT || 5000;
// const cors = require("cors");
// const { readdirSync } = require("fs");
// const { connectDb } = require("./db/connection");

// // handling connection erros
// app.use(cors({ origin: process.env.CLIENT_URL }));
// app.use(express.json());

// connectDb();

// // GET,PUT,POST,DELETE
// app.get("/", (req, res) => {
//   res.send(`<center><h1>Server Running on PORT : ${port} </h1></center>`);
// });

// // dynamically include routes
// readdirSync("./routes").map((route) =>
//   app.use("/api", require(`./routes/${route}`))
// );

// // listen to port
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


// server/index.js

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { readdirSync } = require("fs");
const { connectDb } = require("./db/connection");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

// Routes - dynamically load from /routes
readdirSync("./routes").forEach((route) => {
  app.use("/api", require(`./routes/${route}`));
});

// Base route for testing
app.get("/", (req, res) => {
  res.send(`<center><h1>Server Running on PORT: ${port}</h1></center>`);
});

// Connect to MongoDB and then start server
connectDb().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
  });
});
