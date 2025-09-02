import { useDispatch, useSelector } from "react-redux";
import {
  AdminLayout,
  AdminSectionHeading,
  TableWrapper,
  TableHeadingWrapper,
} from "../../components";
import type { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState, type ChangeEvent } from "react";
import { getAllOrders } from "../../store/slices/orderSlice";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";

function Orders() {
  const dispatch = useDispatch<AppDispatch>();
  const { orders } = useSelector((state: RootState) => state.orderSlice);
  const [orderStatus, setOrderStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOrderStatusChange = async (
    e: ChangeEvent<HTMLSelectElement>,
    _id: string
  ) => {
    setOrderStatus(e.target.value);
    try {
      setLoading(true);
      const response = await fetch(`/api/v1/orders/order/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: e.target.value }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      toast.success(data.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error instanceof Error ? error.message : (error as string));
    }
  };

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch, orderStatus]);

  return (
    <AdminLayout>
      <AdminSectionHeading title="All Orders" />
      <TableWrapper>
        <thead>
          <tr className="text-left">
            <TableHeadingWrapper>
              <input type="checkbox" />
            </TableHeadingWrapper>
            <TableHeadingWrapper>Order ID</TableHeadingWrapper>
            <TableHeadingWrapper>Name and Country</TableHeadingWrapper>
            <TableHeadingWrapper>Status</TableHeadingWrapper>
            <TableHeadingWrapper>Subtotal</TableHeadingWrapper>
            <TableHeadingWrapper>Date</TableHeadingWrapper>
            {/* <TableHeadingWrapper>Details</TableHeadingWrapper> */}
          </tr>
        </thead>
        <tbody>
          {orders && orders.length > 0
            ? orders.map((order: Order) => {
                const orderDate = new Date(
                  order.createdAt!
                ).toLocaleDateString();
                return (
                  <tr key={order._id} className="bg-gray-100 p-2">
                    <td className="px-4 py-2">
                      <input type="checkbox" />
                    </td>
                    <td className="px-4 py-2 text-gray-800 font-semibold">
                      {order._id}
                    </td>
                    <td className="px-4 py-2">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {order.firstName} {order.lastName}
                      </h3>
                      <span className="text-sm font-medium text-gray-800">
                        {" "}
                        {order.shippingAddress.country}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-gray-800">
                      <select
                        disabled={loading}
                        name="orderStatus"
                        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                          handleOrderStatusChange(e, order._id!)
                        }
                        value={order.status}
                        className="disabled:text-gray-400 cursor-pointer accent-popover"
                      >
                        <option value="PENDING">Pending</option>
                        <option value="CONFIRMED">Confirmed</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="DELIVERED">Delivered </option>
                        <option value="CANCELED">Canceled</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 font-semibold text-gray-800">
                      {order.totalAmount}
                    </td>
                    <td className="px-4 py-2 text-gray-800">{orderDate}</td>
                  </tr>
                );
              })
            : Array.from({ length: 6 }, (_, index: number) => (
                <tr key={index} className="w-full">
                  <td>
                    <Skeleton className="w-full h-[80px] rounded-none bg-blue-100 rounded-l-lg" />
                  </td>{" "}
                  <td>
                    <Skeleton className="w-full h-[80px] rounded-none bg-blue-100" />
                  </td>{" "}
                  <td>
                    <Skeleton className="w-full h-[80px] rounded-none bg-blue-100" />
                  </td>{" "}
                  <td>
                    <Skeleton className="w-full h-[80px] rounded-none bg-blue-100" />
                  </td>
                  <td>
                    <Skeleton className="w-full h-[80px] rounded-none bg-blue-100" />
                  </td>{" "}
                  <td>
                    <Skeleton className="w-full h-[80px] rounded-none bg-blue-100 rounded-r-lg" />
                  </td>
                </tr>
              ))}
        </tbody>
        <tfoot>
          <tr className="text-left">
            <TableHeadingWrapper> </TableHeadingWrapper>
            <TableHeadingWrapper>Order ID</TableHeadingWrapper>
            <TableHeadingWrapper>Name and Country</TableHeadingWrapper>
            <TableHeadingWrapper>Status</TableHeadingWrapper>
            {/* <TableHeadingWrapper>Details</TableHeadingWrapper> */}
            <TableHeadingWrapper>Subtotal</TableHeadingWrapper>
            <TableHeadingWrapper>Date</TableHeadingWrapper>
          </tr>
        </tfoot>
      </TableWrapper>
    </AdminLayout>
  );
}

export default Orders;
