import useCustomEvent from "@/hooks/use-custom-event";
import useFetchData from "@/hooks/use-fetch-data";
import { CART_INVALIDATE_EVENT_NAME } from "@/hooks/use-invalidate-cart";
import useCartStore from "@/store/cart-store";

const CartSync = () => {
  const { setIsLoading, setCart } = useCartStore();

  const { refetch } = useFetchData("/cart", {
    useAuthApi: true,
    onSuccess: (data) => setCart(data),
  });

  useCustomEvent(CART_INVALIDATE_EVENT_NAME, () => refetch());
};

export default CartSync;
