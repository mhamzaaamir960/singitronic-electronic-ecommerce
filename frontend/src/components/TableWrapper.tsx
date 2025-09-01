function TableWrapper({ children }: { children: React.ReactNode }) {
  return (
    <table className="relative w-full h-8 mx-auto table-auto border-separate border-spacing-y-2 z-0 ">
      {children}
    </table>
  );
}

export default TableWrapper;
