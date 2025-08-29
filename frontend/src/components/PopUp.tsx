import { type ReactNode } from "react";
import { cn } from "../utils/tailwind_merge";
import { RxCross2 } from "react-icons/rx";

function PopUp({
  children,
  className,
  isOpen,
  setIsOpen,
}: {
  children: ReactNode;
  className?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <>
      {isOpen && (
        <div className="min-w-[250px] w-full h-full flex justify-center items-center bg-gray-700/50 fixed inset-0 z-50">
          <div
            className={cn(
              `relative min-w-[400px] min-h-[200px] bg-white rounded-lg shadow drop-shadow-xl p-5`,
              className
            )}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="cursor-pointer absolute top-5 right-5"
            >
              <RxCross2 className="text-xl text-black hover:text-black/70" />
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export default PopUp;
