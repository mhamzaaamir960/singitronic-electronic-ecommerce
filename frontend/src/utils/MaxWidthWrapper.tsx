import { cn } from "./tailwind_merge";

function MaxWidthWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(`max-w-[1536px] w-full`, className)}>{children}</div>
  );
}

export default MaxWidthWrapper;
