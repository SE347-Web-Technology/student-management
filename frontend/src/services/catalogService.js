import { USE_MOCK, requestApi } from "./apiClient.js";
import { mockStore } from "../mocks/mockDb.js";

function enrichClass(cls) {
  const gvcn = mockStore.teachers.find((t) => Number(t.id) === Number(cls.gvcnId));
  const yr = mockStore.years.find((y) => Number(y.id) === Number(cls.namhocId));
  const siSo = mockStore.students.filter((s) => Number(s.lopId) === Number(cls.id)).length;
  return {
    ...cls,
    tenGvcn: gvcn ? gvcn.hoTen : "Chưa phân công",
    tenNamhoc: yr ? yr.tenNamhoc : "2026-2027",
    siSo,
  };
}

export const catalogService = {
  async getYears() {
    if (USE_MOCK) return [...mockStore.years];
    return requestApi("/academic-years");
  },

  async getClasses({ khoi = "" } = {}) {
    if (USE_MOCK) {
      return mockStore.classes
        .map(enrichClass)
        .filter((c) => !khoi || String(c.khoi) === String(khoi));
    }
    return requestApi(`/classes${khoi ? `?khoi=${khoi}` : ""}`);
  },

  async createClass(payload) {
    if (USE_MOCK) {
      const dup = mockStore.classes.some(
        (c) => c.tenLop.toLowerCase() === payload.tenLop.trim().toLowerCase()
      );
      if (dup) throw new Error("Tên lớp đã tồn tại trong năm học này.");
      const next = {
        id: Math.max(0, ...mockStore.classes.map((c) => c.id)) + 1,
        tenLop: payload.tenLop.trim(),
        khoi: Number(payload.khoi),
        namhocId: 1,
        gvcnId: payload.gvcnId ? Number(payload.gvcnId) : null,
      };
      mockStore.classes.push(next);
      return enrichClass(next);
    }
    return requestApi("/classes", { method: "POST", body: JSON.stringify(payload) });
  },

  async assignStudentToClass(classId, studentId) {
    if (USE_MOCK) {
      const currentCount = mockStore.students.filter(
        (s) => Number(s.lopId) === Number(classId)
      ).length;
      if (currentCount >= mockStore.rules.siSoToiDa) {
        throw new Error(`Lớp đã đạt sĩ số tối đa (${mockStore.rules.siSoToiDa} học sinh).`);
      }
      mockStore.students = mockStore.students.map((s) =>
        Number(s.id) === Number(studentId) ? { ...s, lopId: Number(classId) } : s
      );
      return true;
    }
    return requestApi(`/classes/${classId}/assign-students`, {
      method: "POST",
      body: JSON.stringify({ studentIds: [studentId] }),
    });
  },

  async getSubjects() {
    if (USE_MOCK) return [...mockStore.subjects];
    return requestApi("/subjects");
  },

  async createSubject(payload) {
    if (USE_MOCK) {
      const next = {
        id: Math.max(0, ...mockStore.subjects.map((m) => m.id)) + 1,
        tenMon: payload.tenMon.trim(),
        khoiApDung: Number(payload.khoiApDung),
      };
      mockStore.subjects.push(next);
      return next;
    }
    return requestApi("/subjects", { method: "POST", body: JSON.stringify(payload) });
  },

  async getAssignments({ giaovienId = "" } = {}) {
    if (USE_MOCK) {
      return mockStore.assignments.filter(
        (a) => !giaovienId || Number(a.giaovienId) === Number(giaovienId)
      );
    }
    return requestApi(`/assignments${giaovienId ? `?giaovienId=${giaovienId}` : ""}`);
  },

  async createAssignment(payload) {
    if (USE_MOCK) {
      const dup = mockStore.assignments.some(
        (a) =>
          Number(a.lopId) === Number(payload.lopId) &&
          Number(a.monhocId) === Number(payload.monhocId) &&
          Number(a.hocky) === Number(payload.hocky)
      );
      if (dup) throw new Error("Lớp và môn học này đã có giáo viên phụ trách trong học kỳ.");
      const cls = mockStore.classes.find((c) => Number(c.id) === Number(payload.lopId));
      const subj = mockStore.subjects.find((m) => Number(m.id) === Number(payload.monhocId));
      const tch = mockStore.teachers.find((t) => Number(t.id) === Number(payload.giaovienId));
      const next = {
        id: Math.max(0, ...mockStore.assignments.map((a) => a.id)) + 1,
        lopId: Number(payload.lopId),
        tenLop: cls?.tenLop || "",
        monhocId: Number(payload.monhocId),
        tenMon: subj?.tenMon || "",
        giaovienId: Number(payload.giaovienId),
        tenGiaovien: tch?.hoTen || "",
        hocky: Number(payload.hocky),
      };
      mockStore.assignments.push(next);
      return next;
    }
    return requestApi("/assignments", { method: "POST", body: JSON.stringify(payload) });
  },

  async getTeachers() {
    if (USE_MOCK) return [...mockStore.teachers];
    return requestApi("/teachers");
  },

  async getRules() {
    if (USE_MOCK) return { ...mockStore.rules };
    return requestApi("/rules");
  },

  async updateRules(payload) {
    if (USE_MOCK) {
      mockStore.rules = { ...mockStore.rules, ...payload };
      return { ...mockStore.rules };
    }
    return requestApi("/rules", { method: "PUT", body: JSON.stringify(payload) });
  },
};
