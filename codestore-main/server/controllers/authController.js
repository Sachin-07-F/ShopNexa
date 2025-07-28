// const User = require("../models/User");
// const Admin = require("../models/Admin");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const signup = async (req, res) => {
//   const { name, email, password, phone } = req.body;

//   try {
//     let user = await User.findOne({ email });

//     if (user)
//       return res.status(400).json({
//         success: false,
//         message: "Please try again with different email",
//       });

//     // 1234 -adalfdhbhkafhdkalfdf -> This is how the hasshed password looks like

//     const hasshedPassword = await bcrypt.hash(password, 10);

//     user = new User({
//       name,
//       email,
//       phone,
//       password: hasshedPassword,
//     });

//     await user.save();

//     return res.status(201).json({
//       success: true,
//       message: "User created successfully",
//     });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     let user = await User.findOne({ email });

//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }

//     const comparePassword = await bcrypt.compare(password, user.password);

//     if (!comparePassword)
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid credentials" });

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET // secret key
//     );

//     return res.status(200).json({
//       success: true,
//       message: "User logged in successfully",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// const adminSignup = async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     let admin = await Admin.findOne({ username });

//     if (admin)
//       return res.status(400).json({
//         success: false,
//         message: "Please try again with different username",
//       });

//     const securePassword = await bcrypt.hash(password, 10);

//     admin = new Admin({
//       username,
//       password: securePassword,
//     });

//     await admin.save();

//     return res.status(201).json({
//       success: true,
//       message: "Admin signup successfull",
//     });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// const adminLogin = async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     let admin = await Admin.findOne({ username });

//     if (!admin) {
//       return res.status(404).json({
//         success: false,
//         message: "Please try again with different username",
//       });
//     }

//     const comparePassword = await bcrypt.compare(password, admin.password);

//     if (!comparePassword)
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid credentials" });

//     const token = jwt.sign(
//       { id: admin._id, role: admin.role },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "1d",
//       }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Admin logged in",
//       token,
//       user: {
//         id: admin._id,
//         username: admin.username,
//         role: admin.role,
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// module.exports = { signup, login, adminSignup, adminLogin };
































const User = require("../models/User");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// USER SIGNUP
const signup = async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already in use",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await user.save();

    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// USER LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ADMIN SIGNUP (Only allow one)
const adminSignup = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Restrict only 1 admin creation
    const adminCount = await Admin.countDocuments();
    if (adminCount >= 1) {
      return res.status(403).json({
        success: false,
        message: "Only one admin account is allowed",
      });
    }

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message: "Admin username already taken",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      username,
      password: hashedPassword,
    });

    await admin.save();

    return res.status(201).json({
      success: true,
      message: "Admin signup successful",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ADMIN LOGIN
const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
      token,
      user: {
        id: admin._id,
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { signup, login, adminSignup, adminLogin };
