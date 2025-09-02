import { useEffect, useState } from "react";
import {
  AdminLayout,
  AdminSectionHeading,
  TableHeadingWrapper,
  TableWrapper,
} from "../../components";
import { Skeleton } from "@/components/ui/skeleton";

// const users = [
//   {
//     id: 1,
//     name: "Ali Khan",
//     email: "ali.khan@example.com",
//     role: "admin",
//     phone: "0301-1234567",
//     createdAt: "2025-07-15T10:00:00Z",
//   },
//   {
//     id: 2,
//     name: "Sara Ahmed",
//     email: "sara.ahmed@example.com",
//     role: "user",
//     phone: "0312-9876543",
//     createdAt: "2025-07-16T14:30:00Z",
//   },
//   {
//     id: 3,
//     name: "Hamza Aamir",
//     email: "hamza.aamir@example.com",
//     role: "admin",
//     phone: "0323-1239876",
//     createdAt: "2025-07-17T09:20:00Z",
//   },
//   {
//     id: 4,
//     name: "Fatima Noor",
//     email: "fatima.noor@example.com",
//     role: "user",
//     phone: "0333-6547890",
//     createdAt: "2025-07-18T16:45:00Z",
//   },
//   {
//     id: 5,
//     name: "Usman Raza",
//     email: "usman.raza@example.com",
//     role: "user",
//     phone: "0345-4561234",
//     createdAt: "2025-07-19T11:15:00Z",
//   },
//   {
//     id: 6,
//     name: "Ayesha Tariq",
//     email: "ayesha.tariq@example.com",
//     role: "admin",
//     phone: "0302-7865432",
//     createdAt: "2025-07-20T08:10:00Z",
//   },
//   {
//     id: 7,
//     name: "Bilal Hassan",
//     email: "bilal.hassan@example.com",
//     role: "user",
//     phone: "0308-1122334",
//     createdAt: "2025-07-21T12:00:00Z",
//   },
//   {
//     id: 8,
//     name: "Zara Ali",
//     email: "zara.ali@example.com",
//     role: "user",
//     phone: "0307-9988776",
//     createdAt: "2025-07-22T15:30:00Z",
//   },
//   {
//     id: 9,
//     name: "Tariq Jamil",
//     email: "tariq.jamil@example.com",
//     role: "admin",
//     phone: "0336-2233445",
//     createdAt: "2025-07-23T17:00:00Z",
//   },
//   {
//     id: 10,
//     name: "Hina Shah",
//     email: "hina.shah@example.com",
//     role: "user",
//     phone: "0341-5566778",
//     createdAt: "2025-07-24T13:40:00Z",
//   },
// ];

function Users() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/v1/users", {
          method: "GET"
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(`Error: ${data.message}`);
        }
        console.log(data)
        setUsers(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [users]);

  return (
    <AdminLayout>
      <AdminSectionHeading title="All Users" />
      {/* <AddNewButton buttonTitle="ADD NEW USER" /> */}
      <TableWrapper>
        <thead>
          <tr className="text-left">
            <TableHeadingWrapper>
              <input type="checkbox" />
            </TableHeadingWrapper>
            <TableHeadingWrapper>Email</TableHeadingWrapper>{" "}
            <TableHeadingWrapper>Role</TableHeadingWrapper>
          </tr>
        </thead>
        <tbody className="overflow-y-auto ">
          {users && users.length > 0 ?users.map((user) => (
            <tr key={user._id} className="bg-gray-100 p-2">
              <td className="px-4 py-2">
                <input type="checkbox" />
              </td>
              <td className="px-4 py-2 text-lg text-gray-800">{user.emailAddress}</td>
              <td className="px-4 py-2 text-gray-800">{user.role}</td>
              <td>details</td>
            </tr>
          )) : Array.from({ length: 6 }, (_, index: number) => (
                <tr className="w-full">
                  <td>
                    <Skeleton
                      key={index}
                      className="w-full h-[60px] rounded-none bg-blue-100 rounded-l-lg"
                    />
                  </td>{" "}
                  <td>
                    <Skeleton
                      key={index}
                      className="w-full h-[60px] rounded-none bg-blue-100"
                    />
                  </td>{" "}
                  <td>
                    <Skeleton
                      key={index}
                      className="w-full h-[60px] rounded-none bg-blue-100 rounded-r-lg"
                    />
                  </td>
                </tr>
              ))}
        </tbody>
      </TableWrapper>
    </AdminLayout>
  );
}

export default Users;
