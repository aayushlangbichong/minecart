import React from "react";
import Layout from "../components/layout";
import { Icon } from "@iconify/react/dist/iconify.js";
import useFetchData from "@/hooks/use-fetch-data";
import Button, { ButtonLink } from "@/components/ui/button";
import { ShoppingBagIcon, Trash } from "lucide-react";
import useCustomEvent from "@/hooks/use-custom-event";
import useCartStore from "@/store/cart-store";
import { formatCurrency } from "@/utils/format-currency";
import { ConfirmProductRemoveFromCart } from "@/components/modules/remove-product-from-cart-dialog";
import ROUTES from "@/constants/routes";

const Cart = () => {
  const { cart, isLoading } = useCartStore();
  // Function to calculate total price
  const calculateTotal = () => {
    return cart?.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  };

  return (
    <Layout>
      <div className="container mx-auto py-10">
        {!cart || cart?.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <p className="text-center font-bold">
              Your cart is empty.
              <Icon
                className="mx-auto mt-6 size-20"
                icon={"hugeicons:confused"}
              />
            </p>

            <div className="mt-10">
              <ButtonLink to={ROUTES.SHOP}>
                <ShoppingBagIcon />
                Shop Now
              </ButtonLink>
            </div>
          </div>
        ) : (
          <>
            <ul>
              {cart?.items.map((item) => (
                <li
                  key={item._id}
                  className="cart-item flex gap-2 border-b px-4 py-2 last:border-b-0"
                >
                  <div className="flex gap-2">
                    <h4>{item.product.title}</h4>
                    <p>{formatCurrency(item.product.price)}</p>
                    <div className="quantity-control">
                      <span>{item.quantity}</span>
                    </div>
                  </div>

                  <ConfirmProductRemoveFromCart
                    trigger={
                      <Button
                        className="size-8 opacity-60 hover:opacity-100"
                        variant="danger"
                      >
                        <Trash className="size-4" />
                      </Button>
                    }
                    cartItemId={item?._id}
                  />
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t pt-3">
              <h3>Total: {formatCurrency(calculateTotal())}</h3>
            </div>

            <div className="mt-10 flex justify-end">
              <Button>Place Order</Button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
