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

const TABLE_HEADERS = [
  "Order ID",
  "Items",
  "Total amount",
  "Status",
  "Shipping address",
  "Actions",
];
const MyOrders = () => {
  const { data, refetch } = useFetchData("/orders", { useAuthApi: true });
  return (
    <Layout>
      <div className="mx-auto my-20 max-w-[1400px]">
        <Table>
          <TableHeader>
            <TableRow>
              {TABLE_HEADERS.map((header) => (
                <TableHead className="w-[100px]">{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.orders?.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={TABLE_HEADERS.length}
                  className="py-20 text-center opacity-50"
                >
                  No Orders Found
                </TableCell>
              </TableRow>
            )}
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
                  <Badge variant={order.status}>{order.status}</Badge>
                </TableCell>
                <TableCell>
                  <div> {order.shippingAddress.addressLine1},</div>
                  <div>
                    {order.shippingAddress.city}, {order.shippingAddress.state}
                  </div>
                </TableCell>
                <TableCell>
                  {order.status === "pending" && (
                    <ConfirmOrderCancel
                      orderId={order._id}
                      onCancelSuccess={refetch}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
};

export default MyOrders;
