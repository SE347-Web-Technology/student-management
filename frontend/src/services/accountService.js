import { USE_MOCK, requestApi } from "./apiClient.js";
import { mockStore } from "../mocks/mockDb.js";

export const accountService = {
  async getAll() {
    if (USE_MOCK) return [...mockStore.users];
    return requestApi("/accounts");
  },

  async getUnlinkedTargets() {
    if (USE_MOCK) {
      return {
        teachers: mockStore.teachers.filter((t) => !t.taikhoanId),
        students: mockStore.students.filter((s) => !s.taikhoanId),
      };
    }
    return {
      teachers: (await requestApi("/teachers")).filter((t) => !t.taikhoanId),
      students: (await requestApi("/students")).filter((s) => !s.taikhoanId),
    };
  },

  async create(payload) {
    if (USE_MOCK) {
      const dup = mockStore.users.some(
        (u) => u.username.toLowerCase() === payload.username.trim().toLowerCase()
      );
      if (dup) throw new Error("Tên đăng nhập đã tồn tại trong hệ thống.");

      let fullName = payload.fullName || payload.username;
      const linkedId = payload.linkedId ? Number(payload.linkedId) : null;
      const nextId = Math.max(0, ...mockStore.users.map((u) => u.id)) + 1;

      if (payload.role === "GIAO_VIEN" && linkedId) {
        const tch = mockStore.teachers.find((t) => t.id === linkedId);
        if (tch) {
          fullName = tch.hoTen;
          tch.taikhoanId = nextId;
          tch.username = payload.username.trim();
        }
      } else if (payload.role === "PHU_HUYNH" && linkedId) {
        const stu = mockStore.students.find((s) => s.id === linkedId);
        if (stu) {
          fullName = stu.hoTen;
          stu.taikhoanId = nextId;
        }
      }

      const newAcc = {
        id: nextId,
        username: payload.username.trim(),
        password: payload.password,
        role: payload.role,
        fullName,
        isActive: true,
        linkedId,
      };
      mockStore.users.unshift(newAcc);
      return newAcc;
    }
    return requestApi("/accounts", { method: "POST", body: JSON.stringify(payload) });
  },

  async toggleActive(id) {
    if (USE_MOCK) {
      mockStore.users = mockStore.users.map((acc) =>
        Number(acc.id) === Number(id) ? { ...acc, isActive: !acc.isActive } : acc
      );
      return mockStore.users.find((acc) => Number(acc.id) === Number(id));
    }
    return requestApi(`/accounts/${id}/status`, { method: "PATCH" });
  },
};
