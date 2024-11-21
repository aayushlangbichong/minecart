import { authApi } from "@/lib/api";
import { toast } from "react-toastify";

const handlePlaceOrder = async (e) => {
  e.preventDefault();

  try {
    const response = await authApi.post("/orders", {
      shippingAddress: {
        addressLine1: "address 1", // eg: fields?.addressLine1
        country: "Nepal", // eg: fields?.country
        state: "Bagmati",
        city: "ktm",
        phone: "9811337207",
        email: "aashish@gmail.com",
        zipCode: "10001",
      },
      payment: {
        method: "cod",
      },
      note: "here is the description. here is the description here is the description here is the description",
    });

    if (response) {
      toast.success("Order placed successfully.");
    }
  } catch (err) {
    toast.error("Failed to add product");
  }
};
