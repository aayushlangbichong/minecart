import useCustomEvent from "./use-custom-event";

const CART_INVALIDATE_EVENT_NAME = "invalidate-cart";
const useInvalidateCart = () => {
  const invalidateCart = useCustomEvent(CART_INVALIDATE_EVENT_NAME);

  return invalidateCart;
};

export { CART_INVALIDATE_EVENT_NAME, useInvalidateCart };
