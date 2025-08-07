import {
  AddNewButton,
  AdminLayout,
  AdminSectionHeading,
  TableHeadingWrapper,
  TableWrapper,
} from "../../components";
import { categoryMenuList } from "../../utils/data";

function Categories() {
  return (
    <AdminLayout>
      <AdminSectionHeading title="All Categories" />
      <AddNewButton buttonTitle="ADD NEW CATEGORY" />
      <TableWrapper>
        <thead>
          <tr className="text-left">
            <TableHeadingWrapper>
              <input type="checkbox" />
            </TableHeadingWrapper>
            <TableHeadingWrapper>Name</TableHeadingWrapper>{" "}
            <TableHeadingWrapper>Details</TableHeadingWrapper>
          </tr>
        </thead>
        <tbody className="overflow-y-auto ">
          {categoryMenuList.map((category) => (
            <tr key={category.id} className="bg-gray-100 p-2">
              <td className="px-4 py-2">
                <input type="checkbox" />
              </td>
              <td className="px-4 py-2 text-lg text-gray-800">
                <h3>{category.title}</h3>
              </td>
              <td className="px-4 py-2 text-gray-800 font-semibold">details</td>
            </tr>
          ))}
        </tbody>
      </TableWrapper>
    </AdminLayout>
  );
}

export default Categories;
