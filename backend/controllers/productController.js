import Product from "../models/product.js"

const createProduct = async (req, res) => {
    try {
      const { name, description, price, stock, image } = req.body;
  
      const product = new Product({ name, description, price, stock, image });
  
      await product.save();
  
      res.status(201).json({ message: "Product Created Successfully", product });
    } catch (error) {
      res.status(500).json({ message: "Error creating product", error: error.message });
    }
  }

  const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching products", error: error.message });
    }
  }

  const getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found" });
  
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Error fetching product", error: error.message });
    }
  }

  const updateProduct = async (req, res) => {
    try {
      const { name, description, price, stock, image } = req.body;
  
      const product = await Product.findById(req.params.id);
  
      if (!product) return res.status(404).json({ message: "Product not found" });
  
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.stock = stock || product.stock;
      product.image = image || product.image;
  
      await product.save();
      res.json({ message: "Product Updated Successfully", product });
    } catch (error) {
      res.status(500).json({ message: "Error updating product", error: error.message });
    }
  }

  const deleteProduct = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
  
      if (!product) return res.status(404).json({ message: "Product not found" });
  
      await product.deleteOne();
      res.json({ message: "Product Deleted Successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting product", error: error.message });
    }
  }

  export { createProduct,getAllProducts, getProductById, updateProduct,deleteProduct}