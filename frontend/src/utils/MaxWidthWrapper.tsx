import { cn } from "./tailwind_merge";

function MaxWidthWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(`min-w-[300px] max-w-[1536px] w-full px-5`, className)}>{children}</div>
  );
}

export default MaxWidthWrapper;
