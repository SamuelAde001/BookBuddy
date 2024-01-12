import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export const ProtectedRoute = () => {
  const { user } = useAuthContext();
  return <>{user ? <Outlet /> : <Navigate to="/login" />}</>;
};
