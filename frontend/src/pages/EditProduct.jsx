import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setStock(data.stock);
        setCurrentImage(data.image);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const token = localStorage.getItem("token");
      let imagePath = currentImage;

      // ✅ Step 1: Upload New Image (If Selected)
      if (image) {
        setUploading(true);
        const formData = new FormData();
        formData.append("image", image);
        const uploadResponse = await API.post("/products/upload", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        imagePath = uploadResponse.data.imagePath; // Get uploaded image URL
        setUploading(false);
      }

      // ✅ Step 2: Update Product
      const updatedProduct = { name, description, price, stock, image: imagePath };
      await API.put(`/products/${id}`, updatedProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate("/products");
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to update product");
      setUploading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        
        {/* Show Current Image */}
        {currentImage && (
          <div>
            <p>Current Image:</p>
            <img src={`http://localhost:5000${currentImage}`} alt="Product" className="w-32 h-32 object-cover" />
          </div>
        )}

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
          disabled={uploading}
        >
          {uploading ? "Uploading Image..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
