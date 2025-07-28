// const mongoose = require("mongoose");

// const connectDb = async () => {
//   try {
//     const connection = await mongoose.connect(process.env.MONGO_URI);

//     if (connection.STATES.connecting) {
//       console.log(`Connecting DB to ${connection.connection.host}`);
//     }

//     if (connection.STATES.connected) {
//       console.log(`DB connected`);
//     }

//     if (connection.STATES.disconnected) {
//       console.log(`Disconnected DB from ${connection.connection.host}`);
//     }
//   } catch (error) {
//     console.log("Error connecting to database", error);
//   }
// };

// module.exports = { connectDb };






// server/db/connection.js

const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
  }
};

module.exports = { connectDb };
