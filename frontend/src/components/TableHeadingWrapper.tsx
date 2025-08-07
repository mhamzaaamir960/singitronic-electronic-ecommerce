import { cn } from "../utils/tailwind_merge";

function TableHeadingWrapper({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <th className={cn(`px-4 py-2 text-gray-800 font-semibold`, className)}>
      {children}
    </th>
  );
}

export default TableHeadingWrapper;
