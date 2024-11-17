import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import Button from "../ui/button";
import useCartActions from "@/hooks/use-add-product-to-cart";

export function ConfirmProductRemoveFromCart({ trigger, cartItemId }) {
  if (!cartItemId) {
    throw Error("Cart item id is required");
  }
  const { removeProductsFromCart } = useCartActions();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger || <Button variant="danger">Remove</Button>}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to remove this product?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove your
            product from the cart.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="danger"
            onClick={() => removeProductsFromCart({ itemIds: [cartItemId] })}
          >
            Confirm
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
