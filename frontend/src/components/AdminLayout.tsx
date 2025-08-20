function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="relative w-full flex flex-col gap-y-10 pt-5">{children}</div>;
}

export default AdminLayout;
