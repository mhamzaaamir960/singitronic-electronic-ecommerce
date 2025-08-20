import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Navigate } from "react-router-dom";

function AdminRoutes({ children }: { children: React.ReactNode }) {
  const {user, loading} = useSelector((state: RootState) => state.authSlice);
  if (user?.role !== "admin" && !loading) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default AdminRoutes;
