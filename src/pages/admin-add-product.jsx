import React from "react";
import AdminLayout from "../components/admin-layout";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import { Description } from "@mui/icons-material";
import { api } from "../lib/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ROUTES from "../constants/routes";
import { getToken } from "../utils/tokens";

const defaultValues = {
  title: "",
  description: "",
  price: 0,
  discountedPrice: 0,
};
const AdminAddProduct = () => {
  const [fields, setFields] = React.useState(defaultValues);
  const navigate = useNavigate();

  const handleFieldChange = (e) => {
    setFields((previousValues) => ({
      ...previousValues,
      [e.target.name]: e.target.value,
    }));
  };

  async function handleAtProduct(e) {
    e.preventDefault();

    try {
      const response = await api.post(
        "/products",
        {
          title: fields.title,
          description: fields.description,
          price: fields.price,
          category: [],
          discountedPrice: fields.discountedPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        },
      );

      if (response) {
        toast.success("Product added successfully.");
        navigate(ROUTES.ADMIN_PRODUCTS);
      }
    } catch (err) {
      toast.error("Failed to add product");
    }
  }

  return (
    <AdminLayout>
      <div>
        <form className="w-56 justify-center" onSubmit={handleAtProduct}>
          <Input
            label={"Title"}
            type={"text"}
            name="title"
            value={fields.title}
            onChange={handleFieldChange}
          />
          <Input
            label={"Description"}
            type={"textarea"}
            name="description"
            value={fields.description}
            s
            onChange={handleFieldChange}
          />
          <Input
            label={"Price"}
            type={"number"}
            value={fields.price}
            onChange={handleFieldChange}
            name="price"
            min={0}
          />
          <Input
            label={"Discounted Price"}
            type={"number"}
            value={fields.discountedPrice}
            onChange={handleFieldChange}
            name="discountedPrice"
            min={0}
          />
          {/* <Input label={"Category"} type={"text"} /> */}
          <Button className="mx-12 mt-4" type="submit">
            Add product
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
};
export default AdminAddProduct;
