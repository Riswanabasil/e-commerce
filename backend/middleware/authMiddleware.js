import jwt from "jsonwebtoken"
import Admin from "../models/admin.js"

const protect = async (req, res, next) => {
    try {
      let token = req.headers.authorization;
  
      if (token && token.startsWith("Bearer ")) {
        token = token.split(" ")[1]; 
  
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
  
        req.admin = await Admin.findById(decoded.userId).select("-password"); 
  
        next(); 
      } else {
        res.status(401).json({ message: "Not authorized, no token" });
      }
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  };
  
  export { protect }