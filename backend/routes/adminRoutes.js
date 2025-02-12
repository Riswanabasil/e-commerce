import express from "express";
import { authAdmin, logoutAdmin, registerAdmin } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", authAdmin);
router.post("/logout", logoutAdmin);
router.post("/register", registerAdmin); 
router.get("/profile", protect, (req, res) => {
    res.json(req.admin); 
  })

export default router;
