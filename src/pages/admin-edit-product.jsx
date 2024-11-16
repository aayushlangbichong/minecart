import React, { useEffect, useState } from "react";
import AdminLayout from "../components/admin-layout";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import { api, authApi } from "../lib/api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ROUTES from "../constants/routes";

// 1: get product id from url param
// 2:fetch product detail using productid
// 3:set form default values after fetching the product details
// 4:submit edited data to the backend

const AdminEditProduct = () => {
  const [product, setProduct] = useState(null);
  const params = useParams();
  const productId = params["product-id"];

  const [fields, setFields] = React.useState(null);
  const navigate = useNavigate();

  const handleFieldChange = (e) => {
    setFields((previousValues) => ({
      ...previousValues,
      [e.target.name]: e.target.value,
    }));
  };

  // func def: to fetch product detail and set default form values
  const fetchProduct = async () => {
    try {
      const res = await api.get("/products/" + productId);
      if (res) {
        setProduct(res.data);
        setFields({
          title: res.data.title,
          description: res.data.description,
          price: res.data.price,
          discountedPrice: res.data?.discountedPrice || 0,
        });
      }
    } catch (e) {
      toast.error("Failed to get product");
    }
  };

  // handle product edit
  const handleProductEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await authApi.put("/products/" + productId, {
        title: fields.title,
        description: fields.description,
        price: fields.price,
        discountedPrice: fields.discountedPrice,
      });
      if (res) {
        toast.success("Product Edited Successfully");
        navigate(ROUTES.ADMIN_PRODUCTS);
      }
    } catch (e) {
      toast.error("Failed to edit product");
    }
  };

  // fetch product detail on component mount
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <AdminLayout>
      <div className="mb-6 border-b py-3">EDIT : {product?.title}</div>

      <div>
        <form onSubmit={handleProductEdit} className="w-56 justify-center">
          <Input
            label={"Title"}
            type={"text"}
            name="title"
            value={fields?.title}
            onChange={handleFieldChange}
          />
          <Input
            label={"Description"}
            type={"textarea"}
            name="description"
            value={fields?.description}
            s
            onChange={handleFieldChange}
          />
          <Input
            label={"Price"}
            type={"number"}
            value={fields?.price}
            onChange={handleFieldChange}
            name="price"
            min={0}
          />
          <Input
            label={"Discounted Price"}
            type={"number"}
            value={fields?.discountedPrice}
            onChange={handleFieldChange}
            name="discountedPrice"
            min={0}
          />
          <Button className="mx-12 mt-4" type="submit">
            Update product
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
};
export default AdminEditProduct;
