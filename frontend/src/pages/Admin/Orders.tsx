import { useDispatch, useSelector } from "react-redux";
import {
  AdminLayout,
  AdminSectionHeading,
  TableWrapper,
  TableHeadingWrapper,
} from "../../components";
import type { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { getAllOrders } from "../../store/slices/orderSlice";

// const orders = [
//   {
//     orderId: "ORD001",
//     name: "John Doe",
//     country: "USA",
//     status: "Processing",
//     subtotal: 120.5,
//     shipping: 10.0,
//     total: 130.5,
//     date: "2025-08-01",
//     paymentMethod: "Credit Card",
//     items: 3,
//   },
//   {
//     orderId: "ORD002",
//     name: "Jane Smith",
//     country: "UK",
//     status: "Shipped",
//     subtotal: 85.0,
//     shipping: 5.0,
//     total: 90.0,
//     date: "2025-08-02",
//     paymentMethod: "PayPal",
//     items: 2,
//   },
//   {
//     orderId: "ORD003",
//     name: "Ali Khan",
//     country: "Pakistan",
//     status: "Delivered",
//     subtotal: 200.0,
//     shipping: 0.0,
//     total: 200.0,
//     date: "2025-08-03",
//     paymentMethod: "Cash on Delivery",
//     items: 5,
//   },
//   {
//     orderId: "ORD004",
//     name: "Emma Wilson",
//     country: "Australia",
//     status: "Cancelled",
//     subtotal: 150.0,
//     shipping: 8.0,
//     total: 158.0,
//     date: "2025-08-04",
//     paymentMethod: "Debit Card",
//     items: 4,
//   },
//   {
//     orderId: "ORD005",
//     name: "Carlos Rivera",
//     country: "Mexico",
//     status: "Returned",
//     subtotal: 99.99,
//     shipping: 7.0,
//     total: 106.99,
//     date: "2025-08-05",
//     paymentMethod: "Stripe",
//     items: 1,
//   },
// ];

function Orders() {
  const dispatch = useDispatch<AppDispatch>();
  const { orders } = useSelector((state: RootState) => state.orderSlice);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

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
          {orders.map((order: Order) => {
            const orderDate = new Date(order.createdAt!).toLocaleDateString();
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
                <td className="px-4 py-2 text-gray-800">{order.status}</td>
                <td className="px-4 py-2 font-semibold text-gray-800">
                  {order.totalAmount}
                </td>
                <td className="px-4 py-2 text-gray-800">{orderDate}</td>
              </tr>
            );
          })}
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
