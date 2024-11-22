import React from "react";

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
import { ChevronDown, User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";

const options = [
  "processing",
  "pending",
  "cancelled",
  "shipped",
  "delivered",
  "failed",
];
export function ChangeOrderStatus({ order, onChangeSuccess }) {
  const [showDialog, setShowDialog] = React.useState(false);
  const [orderStatus, setOrderStatus] = useState(order.status);
  const handleDeleteProduct = async () => {
    try {
      const res = await authApi.patch("/orders/" + order._id, {
        status: orderStatus,
      });
      if (res) {
        toast.success("Order status updated successfully.");
        onChangeSuccess();
        setShowDialog(false);
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || "failed to update");
    }
  };

  const isOrderChanged = order.status !== orderStatus;

  return (
    <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
      <AlertDialogTrigger className="flex gap-2">
        <ChevronDown />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Change Order Status</AlertDialogTitle>
        </AlertDialogHeader>
        <div>
          <Select value={orderStatus} onValueChange={setOrderStatus}>
            <SelectTrigger className="capitalize">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option} value={option} className="capitalize">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            disabled={!isOrderChanged}
            variant="primary"
            onClick={handleDeleteProduct}
          >
            Confirm
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
