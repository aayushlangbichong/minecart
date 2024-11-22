import React from "react";
import Layout from "../components/layout";
import { Icon } from "@iconify/react/dist/iconify.js";
import useCartStore from "@/store/cart-store";
import { formatCurrency } from "@/utils/format-currency";
import { ConfirmProductRemoveFromCart } from "@/components/modules/remove-product-from-cart-dialog";
import Button, { ButtonLink } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";
import { NO_IMAGE_URL } from "../constants/placeholder"; // Placeholder if image is not available

const TABLE_HEADERS = ["Product", "Price", "Quantity", "Actions"];

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
        {!cart || cart?.items?.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <p className="text-center font-bold">
              Your cart is empty.
              <Icon
                className="mx-auto mt-6 size-20"
                icon={"hugeicons:confused"}
              />
            </p>
            <div className="mt-10">
              <ButtonLink to={ROUTES.SHOP}>Shop Now</ButtonLink>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {TABLE_HEADERS.map((header, index) => (
                    <TableHead key={index}>{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.items.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell className="flex items-center gap-4 font-medium">
                      <img
                        src={item.product?.thumbnail?.imgurUrl || NO_IMAGE_URL}
                        alt={item.product?.title}
                        className="h-12 w-12 rounded object-cover"
                      />
                      <span>{item?.product?.title}</span>
                    </TableCell>
                    <TableCell>{formatCurrency(item.product.price)}</TableCell>
                    <TableCell>{item?.quantity}</TableCell>
                    <TableCell>
                      <ConfirmProductRemoveFromCart
                        trigger={
                          <Button
                            className="opacity-60 hover:opacity-100"
                            variant="danger"
                          >
                            <Trash className="size-4" />
                          </Button>
                        }
                        cartItemId={item._id}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-6 border-t pt-3">
              <h3>Total: {formatCurrency(calculateTotal())}</h3>
            </div>
            <div className="mt-10 flex justify-end">
              <ButtonLink to={ROUTES.PLACE_ORDER}>Place Order</ButtonLink>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
