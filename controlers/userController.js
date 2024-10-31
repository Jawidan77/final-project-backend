import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

// Register user
const registerUser = async (req, res) => {
    console.log(req.body);
    
  const { name, password, email } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword, // Store the hashed password
    });

    const user = await newUser.save();

    // Send success response without sending the password
    res.json({ success: true, message: "User registered successfully", user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error occurred during registration" });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    // Compare the entered password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    // Send success response with user details (excluding password)
    res.json({
      success: true,
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error occurred during login" });
  }
};

export { registerUser, loginUser };
