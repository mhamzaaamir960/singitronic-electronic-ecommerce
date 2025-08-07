function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="w-full flex flex-col gap-y-10 pt-5">{children}</div>;
}

export default AdminLayout;
