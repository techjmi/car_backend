const bcryptjs = require("bcryptjs");
const ASP_USER = require("../model/user_schema"); // Your user schema
const jwt = require("jsonwebtoken");
// POST user in the database API (Signup)
const postData = async (req, res) => {
  const { fullName, email, password, profile_pic } = req.body;
  try {
    // Check if all fields are provided
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if email already exists
    const userExists = await ASP_USER.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered" });
    }
    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create a new user
    const newUser = new ASP_USER({
      fullName,
      password: hashedPassword,
      profile_pic,
      email,
    });

    // Save the new user to the database
    await newUser.save();

    // Return success response
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const signIn = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if both email and password are provided
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
  
      // Check if user exists with the provided email
      const user = await ASP_USER.findOne({ email });
    //   console.log("pass emai", user);
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Compare the provided password with the stored hashed password
      const isMatch = bcryptjs.compareSync(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Create a JWT token
      const token = jwt.sign(
        { id:user._id,email: user.email,fullName: user.fullName,profile_pic:user.profile_pic },
        process.env.JWT_SECRET
      );
      // Remove the password from user details
      const { password: pass, ...rest } = user._doc;
    //   console.log("User details:", rest);
      // Set the cookie and return user details
      res
        .cookie("token_asp", token, {
          httpOnly: true,  // Prevents access to the cookie via JavaScript
          secure: false,   // Set to true if using HTTP
        })
        .json({ message: "Signin successful", token, user: rest });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
//get use by token or id
const fetchUser = async (req, res) => {
  try {
// console.log('ftch',req.user)
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.json({
      email: req.user.email,
      name: req.user.fullName,
      profile_pic:req.user.profile_pic

    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};
const handleLogout = (req, res) => {
    // Clear the token cookie on the server side
    res.clearCookie('token_asp'); // This should match the name of your cookie
    res.status(200).json({ message: 'Logged out successfully' });
  };
  
// console.log(fetchUser);
module.exports = { postData, signIn, fetchUser, handleLogout };
