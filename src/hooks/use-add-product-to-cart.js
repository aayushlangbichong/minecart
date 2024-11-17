import { authApi } from "@/lib/api";
import useAuthStore from "@/store/auth-store";
import useLoginWallStore from "@/store/login-wall-store";
import { toast } from "react-toastify";
import { useInvalidateCart } from "./use-invalidate-cart";

const useCartActions = () => {
  const { isLoggedIn } = useAuthStore();
  const { setOpen } = useLoginWallStore();

  const invalidateCart = useInvalidateCart();

  //   function to add product to cart
  const addProductToCart = async ({ quantity, productId }) => {
    if (!isLoggedIn) {
      setOpen(true);
      return;
    }
    try {
      const res = await authApi.post("/cart/add", { quantity, productId });
      if (res) {
        toast.success("product added to cart");
        invalidateCart();
      }
    } catch (e) {
      toast.error("failed to add product");
    }
  };

  //   function to remove product from cart
  const removeProductsFromCart = async ({ itemIds }) => {
    if (!isLoggedIn) {
      setOpen(true);
      return;
    }
    try {
      const res = await authApi.post("/cart/remove-items", { itemIds });
      if (res) {
        toast.success("product/s removed from the cart");
        invalidateCart();
      }
    } catch (e) {
      toast.error("failed to remove product/s");
    }
  };

  return { addProductToCart, removeProductsFromCart };
};
export default useCartActions;
