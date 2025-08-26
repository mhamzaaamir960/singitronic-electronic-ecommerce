import type { ChangeEvent } from "react";

function SortBy({
  sortValue,
  setSortValue,
}: {
  sortValue: string;
  setSortValue: (sortValue: string) => void;
}) {
  return (
    <select
      className="cursor-pointer border-gray-400 py-2 px-2 text-base border-2 rounded-lg w-40 outline-none bg-white"
      name="sort"
      onChange={(e: ChangeEvent<HTMLSelectElement>) =>
        setSortValue(e.target.value)
      }
      value={sortValue}
    >
      <option value="default">Default</option>
      <option value="a-z">Sort A-Z</option>
      <option value="z-a">Sort Z-A</option>
      <option value="low-to-high">Lowest Price</option>
      <option value="high-to-low">Highest Price</option>
    </select>
  );
}

export default SortBy;
