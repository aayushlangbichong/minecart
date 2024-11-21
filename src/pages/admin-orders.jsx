import Layout from "@/components/layout";
import useFetchData from "@/hooks/use-fetch-data";

import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/utils/format-currency";
import { ConfirmOrderCancel } from "@/components/modules/cancel-product-dialog";
import { Badge } from "@/components/ui/badge";
import AdminLayout from "@/components/admin-layout";
import { DropdownMenuDemo } from "@/components/demo/dropdown-demo";
import { AdminOrderActions } from "@/components/modules/admin-order-actions";
import { ChangeOrderStatus } from "@/components/modules/change-order-status";

const TABLE_HEADERS = [
  "Order ID",
  "Items",
  "Total amount",
  "Status",
  "Shipping address",
  "Actions",
];
const AdminOrders = () => {
  const { data, refetch } = useFetchData("/orders", { useAuthApi: true });
  return (
    <AdminLayout>
      <div className="mx-auto my-20 max-w-[1400px]">
        <Table>
          <TableHeader>
            <TableRow>
              {TABLE_HEADERS.map((header) => (
                <TableHead className="w-[100px]" key={header}>
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell className="font-medium">#{order._id}</TableCell>
                <TableCell>
                  <ol className="list-disc capitalize">
                    {order.items.map((item) => (
                      <li key={item._id}>
                        <div>
                          {item?.product?.title || "(deleted product)"} x
                          {item.quantity}
                        </div>
                      </li>
                    ))}
                  </ol>
                </TableCell>
                <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
                <TableCell className="capitalize">
                  <div className="flex items-center gap-2">
                    <Badge variant={order.status}>{order.status}</Badge>

                    <ChangeOrderStatus
                      order={order}
                      onChangeSuccess={refetch}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div> {order.shippingAddress.addressLine1},</div>
                  <div>
                    {order.shippingAddress.city}, {order.shippingAddress.state}
                  </div>
                </TableCell>
                <TableCell>
                  <AdminOrderActions />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
