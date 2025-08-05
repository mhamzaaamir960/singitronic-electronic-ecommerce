import { cn } from "./tailwind_merge";

function MaxWidthWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(className,`max-w-[1536px] w-full  `)}>
      {children}
    </div>
  );
}

export default MaxWidthWrapper;
