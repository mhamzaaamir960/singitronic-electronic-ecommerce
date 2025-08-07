function TableWrapper({ children }: { children: React.ReactNode }) {
  return (
    <table className="w-full mx-auto table-auto border-separate border-spacing-y-2 ">
      {children}
    </table>
  );
}

export default TableWrapper;
