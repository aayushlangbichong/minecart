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
import { Trash } from "lucide-react";

export function ConfirmImageDelete({ className, imageId, onDeleteSuccess }) {
  const handleDeleteProduct = async () => {
    try {
      const res = await authApi.delete("/images/" + imageId);
      if (res) {
        toast.success("Image deleted successfully.");
        onDeleteSuccess();
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || "failed to delete image");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="danger" className={className}>
          <Trash className="size-6" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this image?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            image and remove your from the system.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="danger" onClick={handleDeleteProduct}>
            Confirm
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
