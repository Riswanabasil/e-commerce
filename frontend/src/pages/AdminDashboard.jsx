import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800">Welcome to Homey</h1>
        <p className="text-gray-600 text-center mt-2">Your Modern Interior  Studio </p>

        <nav className="mt-6 space-y-4">
          <Link to="/products" className="block w-full text-center bg-blue-500 text-white py-3 rounded-md font-semibold hover:bg-blue-600 transition duration-300">
            Manage Products
          </Link>
          <Link to="/add-product" className="block w-full text-center bg-green-500 text-white py-3 rounded-md font-semibold hover:bg-green-600 transition duration-300">
            Add Product
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("admin");
              window.location.href = "/login";
            }}
            className="block w-full text-center bg-red-500 text-white py-3 rounded-md font-semibold hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
};

export default AdminDashboard;
