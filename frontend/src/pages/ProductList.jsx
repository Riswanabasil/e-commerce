import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = "http://localhost:5000";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products");
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const token = localStorage.getItem("token");
      await API.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Product Listing</h1>
        <p className="text-gray-600 text-center mt-2">Manage your products efficiently</p>

        <div className="mt-6">
          {loading ? (
            <p className="text-center text-gray-600">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-600">No products available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={product.image.startsWith("/uploads") ? `${baseUrl}${product.image}` : product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                    <p className="text-gray-600 text-sm">{product.description}</p>
                    <p className="text-lg font-bold text-green-600 mt-2">₹{product.price}</p>
                    <div className="flex justify-between items-center mt-4">
                      <Link to={`/edit-product/${product._id}`} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link to="/admin" className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition">
            Back to Admin Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
