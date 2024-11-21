import Layout from "@/components/layout";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import ROUTES from "@/constants/routes";
import { useInvalidateCart } from "@/hooks/use-invalidate-cart";
import { authApi } from "@/lib/api";
import useCartStore from "@/store/cart-store";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const { cart, setCart } = useCartStore();

  // Move `fields` to a state variable
  const [fields, setFields] = useState({
    addressLine1: "",
    country: "",
    state: "",
    city: "",
    phone: "",
    email: "",
    zipCode: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await authApi.post("/orders", {
        shippingAddress: {
          addressLine1: fields.addressLine1,
          country: fields.country,
          state: fields.state,
          city: fields.city,
          phone: fields.phone,
          email: fields.email,
          zipCode: fields.zipCode,
        },
        payment: {
          method: "cod",
        },
        note: "here is the description. here is the description here is the description here is the description",
      });

      if (response) {
        // if order place is successfull set cart to null
        setCart(null);
        setIsSuccess(true);
        toast.success("Order placed successfully.");
        navigate(ROUTES.MY_ORDERS);
      }
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to add product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mx-auto my-20 max-w-[300px] justify-center">
        <h1 className="font-bold">PLACE ORDER FORM</h1>
        <br />

        {!cart ||
          (cart?.items?.length === 0 && (
            <div className="mb-2 text-3xl font-bold">Cart is empty!!</div>
          ))}

        <form className="flex flex-col gap-4" onSubmit={handlePlaceOrder}>
          <Input
            label={"Address Line1"}
            type={"text"}
            name={"addressLine1"}
            value={fields.addressLine1}
            onChange={handleInputChange}
          />

          <Input
            label={"Country"}
            type={"text"}
            name={"country"}
            value={fields.country}
            onChange={handleInputChange}
          />

          <Input
            label={"State"}
            type={"text"}
            name={"state"}
            value={fields.state}
            onChange={handleInputChange}
          />
          <Input
            label={"City"}
            type={"text"}
            name={"city"}
            value={fields.city}
            onChange={handleInputChange}
          />
          <Input
            label={"Phone number"}
            type={"number"}
            name={"phone"}
            value={fields.phone}
            onChange={handleInputChange}
          />
          <Input
            label={"Email"}
            type={"email"}
            name={"email"}
            value={fields.email}
            onChange={handleInputChange}
          />
          <Input
            label={"Zip Code"}
            type={"number"}
            name={"zipCode"}
            value={fields.zipCode}
            onChange={handleInputChange}
          />

          <Button
            disabled={isSuccess || isLoading}
            variant="primary"
            type="submit"
            className="w-full justify-center"
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin" /> Processing...
              </>
            ) : (
              " Place Order"
            )}
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default PlaceOrder;
