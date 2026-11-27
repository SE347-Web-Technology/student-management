# Phân hệ Giao diện Web - Frontend (SV1, SV2, SV3)

## 1. Chạy thử ngay (không cần Backend)
```bash
cp .env.example .env
npm install
npm run dev
```
Mặc định Frontend sử dụng dữ liệu giả lập liên thông tại `src/mocks/mockDb.js` (`VITE_USE_MOCK=true`).
Khi nối với Backend thật của `SV4`, `SV5`, sửa `VITE_USE_MOCK=false` trong `.env`.

## 2. Phân quyền thư mục để 3 người code độc lập
1. **SV1 – Frontend 1 (Layout Template & Giáo vụ Cụm 1):**
   - `src/layouts/*` (`MainLayout.jsx`, `AuthLayout.jsx`, `layout.css`)
   - `src/pages/auth/LoginPage.jsx` (`C01, M01`)
   - `src/pages/admin/AdminDashboardPage.jsx` (`A01`)
   - `src/pages/admin/StudentsPage.jsx` (`A02–A05`)
   - `src/pages/admin/ClassesPage.jsx` (`A06–A08`)
   - `src/pages/admin/SubjectsAssignmentsPage.jsx` (`A09`)
2. **SV2 – Frontend 2 (UI Components dùng chung & Giáo vụ Cụm 2):**
   - `src/components/*` (`Header`, `Sidebar`, `Footer`, `DataTable`, `Modal`, `FormControls`, `StatCard`, `Toast`)
   - `src/pages/admin/GradeLookupAdminPage.jsx` (`A10`)
   - `src/pages/admin/ReportsPage.jsx` (`A11–A13`)
   - `src/pages/admin/SettingsPage.jsx` (`A14`)
   - `src/pages/admin/AccountsPage.jsx` (`A15`)
   - `src/pages/admin/DisciplineAdminPage.jsx` (`A16`)
3. **SV3 – Frontend 3 (Giáo viên, Học sinh/Phụ huynh & Responsive Mobile):**
   - `src/pages/teacher/*` (`T01–T05, M02`)
   - `src/pages/student/*` (`P01–P04, M03`)
   - `src/styles/responsive.css`
