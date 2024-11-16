import React, { useEffect, useState } from "react";
import { products } from "../data/products";
import { Icon } from "@iconify/react/dist/iconify.js";
import AdminLayout from "../components/admin-layout";
import { api, authApi } from "../lib/api";
import { NO_IMAGE_URL } from "../constants/placeholder";
import { toast } from "react-toastify";
import ROUTES from "../constants/routes";
import { ButtonLink } from "../components/ui/button";
import { ConfirmProductDelete } from "../components/modules/delete-product-dialog";

const AdminProducts = () => {
  const [products, setProducts] = useState(null);

  const fetchProduct = async () => {
    const res = await api.get("/products?limit=50");
    if (res) {
      setProducts(res.data.products);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <AdminLayout>
      <div className="min-h-screen grow bg-gray-100 p-6">
        <header className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Products Grid</h2>
          <ButtonLink
            className={
              "rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            }
            to={ROUTES.ADMIN_ADD_PRODUCT}
          >
            Add product
          </ButtonLink>
        </header>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products && products.length === 0 && (
            <div className="col-span-full my-20 text-center text-2xl font-bold">
              No products added
            </div>
          )}

          {products?.map((product) => {
            const hasDiscount = product.discountedPrice > 0;
            return (
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
                <div className="mb-4 flex gap-2 text-gray-700">
                  <span
                    className={
                      hasDiscount ? "[text-decoration:line-through]" : ""
                    }
                  >
                    Rs.{product.price}
                  </span>
                  {hasDiscount && <span>Rs.{product.discountedPrice}</span>}
                </div>
                <div className="flex justify-between">
                  <ButtonLink
                    className={
                      "rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
                    }
                    to={`${ROUTES.ADMIN_PRODUCTS}/${product._id}/edit`}
                  >
                    Edit
                  </ButtonLink>

                  <ConfirmProductDelete
                    productId={product._id}
                    onDeleteSuccess={fetchProduct}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
};
export default AdminProducts;
