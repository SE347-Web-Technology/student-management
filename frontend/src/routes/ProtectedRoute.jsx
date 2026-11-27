import { Navigate } from "react-router-dom";
import { authService } from "../services/authService.js";

export default function ProtectedRoute({ allowedRoles, children }) {
  const user = authService.getCurrentUser();
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const home =
      user.role === "GIAO_VU"
        ? "/admin/dashboard"
        : user.role === "GIAO_VIEN"
        ? "/teacher/dashboard"
        : "/student/dashboard";
    return <Navigate to={home} replace />;
  }
  return children;
}
