import { toast } from "react-toastify";
import { authApi } from "../../lib/api";
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

export function ConfirmOrderCancel({ orderId, onCancelSuccess }) {
  const handleCancelOrder = async () => {
    try {
      const res = await authApi.patch("/orders/" + orderId + "/cancel");
      if (res) {
        toast.success("Order cancelled successfully.");
        onCancelSuccess();
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || "failed to cancel");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="danger">Cancel</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to cancel this order?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will cancel your order.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="danger" onClick={handleCancelOrder}>
            Confirm
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
