import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Navigate } from "react-router-dom";

function AdminRoutes({ children }: { children: React.ReactNode }) {
  const user = useSelector((state: RootState) => state.authSlice.user);
  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default AdminRoutes;
