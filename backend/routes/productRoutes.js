import express from "express";
import { createProduct, getAllProducts, getProductById,updateProduct,deleteProduct } from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router()
router.get("/", getAllProducts);
router.get("/:id", getProductById)
router.post("/", protect, createProduct)
router.put("/:id", protect, updateProduct)
router.delete("/:id", protect, deleteProduct)
router.post("/upload", protect, upload.single("image"), (req, res) => {
    res.json({ message: "Image uploaded successfully", imagePath: `/uploads/${req.file.filename}` });
  })

export default router