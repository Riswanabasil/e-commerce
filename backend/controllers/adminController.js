import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";

// Register 
const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();

    res.status(201).json({ message: "Admin Registered Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//  Login
const authAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.status(200).json({
      message: "Login Successful",
      token,
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Logout 
const logoutAdmin = (req, res) => {
  res.json({ message: "Admin logged out" });
};

export { registerAdmin, authAdmin, logoutAdmin };
