import { USE_MOCK, requestApi } from "./apiClient.js";
import { mockStore } from "../mocks/mockDb.js";

export const attendanceService = {
  async getSession({ phancongId = "", ngay = "", buoiHoc = "" } = {}) {
    if (USE_MOCK) {
      return mockStore.attendance.filter(
        (a) =>
          (!phancongId || Number(a.phancongId) === Number(phancongId)) &&
          (!ngay || a.ngay === ngay) &&
          (!buoiHoc || a.buoiHoc === buoiHoc)
      );
    }
    const params = new URLSearchParams({ phancongId, ngay, buoiHoc });
    return requestApi(`/attendance?${params.toString()}`);
  },

  async getByStudent(hocsinhId) {
    if (USE_MOCK) {
      return mockStore.attendance.filter((a) => Number(a.hocsinhId) === Number(hocsinhId));
    }
    return requestApi(`/attendance/student/${hocsinhId}`);
  },

  async saveBatch(rows) {
    if (USE_MOCK) {
      rows.forEach((updated) => {
        const idx = mockStore.attendance.findIndex((a) => Number(a.id) === Number(updated.id));
        if (idx >= 0) mockStore.attendance[idx] = { ...updated };
        else mockStore.attendance.push({ ...updated, id: Date.now() + Math.random() });
      });
      return rows;
    }
    return requestApi("/attendance/batch", { method: "PUT", body: JSON.stringify(rows) });
  },
};
