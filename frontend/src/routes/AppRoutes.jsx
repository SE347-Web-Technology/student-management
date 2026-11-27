// Định tuyến toàn bộ trang Web theo Sitemap Mục 1.5 - SV1/SV2/SV3 chỉ cần sửa file Page của mình
import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

import LoginPage from "../pages/auth/LoginPage.jsx";

// SV1 - Admin Cụm 1
import AdminDashboardPage from "../pages/admin/AdminDashboardPage.jsx";
import StudentsPage from "../pages/admin/StudentsPage.jsx";
import ClassesPage from "../pages/admin/ClassesPage.jsx";
import SubjectsAssignmentsPage from "../pages/admin/SubjectsAssignmentsPage.jsx";

// SV2 - Admin Cụm 2
import GradeLookupAdminPage from "../pages/admin/GradeLookupAdminPage.jsx";
import ReportsPage from "../pages/admin/ReportsPage.jsx";
import SettingsPage from "../pages/admin/SettingsPage.jsx";
import AccountsPage from "../pages/admin/AccountsPage.jsx";
import DisciplineAdminPage from "../pages/admin/DisciplineAdminPage.jsx";

// SV3 - Teacher & Student
import TeacherDashboardPage from "../pages/teacher/TeacherDashboardPage.jsx";
import GradeEntryPage from "../pages/teacher/GradeEntryPage.jsx";
import AttendancePage from "../pages/teacher/AttendancePage.jsx";
import DisciplineTeacherPage from "../pages/teacher/DisciplineTeacherPage.jsx";
import StudentDashboardPage from "../pages/student/StudentDashboardPage.jsx";
import StudentGradesPage from "../pages/student/StudentGradesPage.jsx";
import StudentAttendancePage from "../pages/student/StudentAttendancePage.jsx";
import StudentDisciplinePage from "../pages/student/StudentDisciplinePage.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["GIAO_VU"]}>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="classes" element={<ClassesPage />} />
        <Route path="subjects" element={<SubjectsAssignmentsPage />} />
        <Route path="grades" element={<GradeLookupAdminPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="accounts" element={<AccountsPage />} />
        <Route path="discipline" element={<DisciplineAdminPage />} />
      </Route>

      <Route
        path="/teacher"
        element={
          <ProtectedRoute allowedRoles={["GIAO_VIEN"]}>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<TeacherDashboardPage />} />
        <Route path="grades" element={<GradeEntryPage />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="discipline" element={<DisciplineTeacherPage />} />
      </Route>

      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={["PHU_HUYNH"]}>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<StudentDashboardPage />} />
        <Route path="grades" element={<StudentGradesPage />} />
        <Route path="attendance" element={<StudentAttendancePage />} />
        <Route path="discipline" element={<StudentDisciplinePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
