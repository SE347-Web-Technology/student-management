import { USE_MOCK, requestApi } from "./apiClient.js";
import { mockStore } from "../mocks/mockDb.js";

function enrichStudent(stu) {
  const cls = mockStore.classes.find((c) => Number(c.id) === Number(stu.lopId));
  return {
    ...stu,
    tenLop: cls ? cls.tenLop : "Chưa xếp lớp",
  };
}

export const studentService = {
  async getAll({ keyword = "", lopId = "" } = {}) {
    if (USE_MOCK) {
      return mockStore.students
        .map(enrichStudent)
        .filter((s) => {
          const kw = keyword.trim().toLowerCase();
          const matchKey =
            !kw ||
            s.hoTen.toLowerCase().includes(kw) ||
            s.tenLop.toLowerCase().includes(kw) ||
            String(s.id).includes(kw);
          const matchClass = !lopId || String(s.lopId) === String(lopId);
          return matchKey && matchClass;
        });
    }
    const params = new URLSearchParams({ keyword, lopId });
    return requestApi(`/students?${params.toString()}`);
  },

  async getById(id) {
    if (USE_MOCK) {
      const found = mockStore.students.find((s) => Number(s.id) === Number(id));
      return found ? enrichStudent(found) : null;
    }
    return requestApi(`/students/${id}`);
  },

  async create(payload) {
    if (USE_MOCK) {
      const next = {
        ...payload,
        id: Math.max(0, ...mockStore.students.map((s) => s.id)) + 1,
        lopId: payload.lopId ? Number(payload.lopId) : null,
        taikhoanId: null,
      };
      mockStore.students.unshift(next);
      return enrichStudent(next);
    }
    return requestApi("/students", { method: "POST", body: JSON.stringify(payload) });
  },

  async update(id, payload) {
    if (USE_MOCK) {
      mockStore.students = mockStore.students.map((s) =>
        Number(s.id) === Number(id)
          ? { ...s, ...payload, lopId: payload.lopId ? Number(payload.lopId) : null }
          : s
      );
      const updated = mockStore.students.find((s) => Number(s.id) === Number(id));
      return updated ? enrichStudent(updated) : null;
    }
    return requestApi(`/students/${id}`, { method: "PUT", body: JSON.stringify(payload) });
  },

  async remove(id) {
    if (USE_MOCK) {
      mockStore.students = mockStore.students.filter((s) => Number(s.id) !== Number(id));
      return null;
    }
    return requestApi(`/students/${id}`, { method: "DELETE" });
  },
};
