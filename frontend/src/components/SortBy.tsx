function SortBy() {
  return (
    <select
      className="cursor-pointer border-gray-400 py-2 px-2 text-base border-2 rounded-lg w-40 outline-none bg-white"
      name="sort"
    >
      <option value="defaultSort">Default</option>
      <option value="titleAsc">Sort A-Z</option>
      <option value="titleDesc">Sort Z-A</option>
      <option value="lowPrice">Lowest Price</option>
      <option value="highPrice">Highest Price</option>
    </select>
  );
}

export default SortBy;
