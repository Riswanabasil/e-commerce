import jwt from "jsonwebtoken"

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "2h",  
    });
  
    // Set JWT in HTTP-only cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 2 * 60 * 60 * 1000, 
    });
  };
  
  export default generateToken;
  