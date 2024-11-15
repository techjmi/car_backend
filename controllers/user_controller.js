const bcryptjs = require("bcryptjs");
const ASP_USER = require("../model/user_schema");
const jwt = require("jsonwebtoken");

// POST user in the database API (Signup)
const postData = async (req, res) => {
  const { fullName, email, password, profile_pic } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    const userExists = await ASP_USER.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new ASP_USER({
      fullName,
      password: hashedPassword,
      profile_pic,
      email,
    });

    await newUser.save();
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// User Signin
const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await ASP_USER.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = bcryptjs.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, fullName: user.fullName, profile_pic: user.profile_pic },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = user._doc;
    res
      .cookie("asp_token", token, {
        httpOnly: true, 
        secure: false, 
        sameSite: "lax", 
      })
      .json({ message: "Signin successful", token, user: rest });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get user by token or ID
const fetchUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.json({
      email: req.user.email,
      name: req.user.fullName,
      profile_pic: req.user.profile_pic,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

// Logout User
const handleLogout = (req, res) => {
  res.clearCookie('asp_token'); 
  res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = { postData, signIn, fetchUser, handleLogout };
