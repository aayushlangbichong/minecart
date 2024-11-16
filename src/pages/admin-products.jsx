import React, { useEffect, useState } from "react";
import { products } from "../data/products";
import { Icon } from "@iconify/react/dist/iconify.js";
import AdminLayout from "../components/admin-layout";
import { api, authApi } from "../lib/api";
import { NO_IMAGE_URL } from "../constants/placeholder";
import { toast } from "react-toastify";

const AdminProducts = () => {
  const [products, setProducts] = useState(null);

  const fetchProduct = async () => {
    const res = await api.get("/products?limit=50");
    if (res) {
      setProducts(res.data.products);
      console.log(res.data);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
      const res = await authApi.delete("/products/" + productId);
      if (res) {
        toast.success("Product deleted successfully.");
        fetchProduct();
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || "failed to delete");
    }
  };
  return (
    <AdminLayout>
      <div className="min-h-screen grow bg-gray-100 p-6">
        <header className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Products Grid</h2>
          <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            Create new
          </button>
        </header>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products?.map((product) => (
            <div
              key={product._id}
              className="rounded bg-white p-4 shadow hover:shadow-lg"
            >
              <img
                src={product?.thumbnail || NO_IMAGE_URL}
                alt={product.name}
                className="mb-4 h-48 w-full rounded object-cover"
              />
              <h4 className="mb-2 text-lg font-medium">{product.title}</h4>
              <p className="mb-4 text-gray-700">{product.price}</p>
              <div className="flex justify-between">
                <button className="rounded bg-yellow-400 px-3 py-1 text-white hover:bg-yellow-500">
                  Edit
                </button>
                <button
                  className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};
export default AdminProducts;
