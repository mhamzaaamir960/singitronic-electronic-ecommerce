import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.authSlice
  );
  
  if (!isAuthenticated && !loading) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

export default ProtectedRoutes;
