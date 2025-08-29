import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SortBy({
  sortValue,
  setSortValue,
}: {
  sortValue: string;
  setSortValue: (sortValue: string) => void;
}) {
  return (
    <Select
      name="sort"
      onValueChange={(sortValue) => setSortValue(sortValue)}
      value={sortValue}
    >
      <SelectTrigger className="w-[130px] sm:w-[150px] md:w-[180px]">
        <SelectValue placeholder="Sort By" />{" "}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort By</SelectLabel>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="a-z">Sort A-Z</SelectItem>
          <SelectItem value="z-a">Sort Z-A</SelectItem>
          <SelectItem value="low-to-high">Lowest Price</SelectItem>
          <SelectItem value="high-to-low">Highest Price</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SortBy;
