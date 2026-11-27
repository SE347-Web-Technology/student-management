import { USE_MOCK, requestApi } from "./apiClient.js";
import { mockStore } from "../mocks/mockDb.js";
import { calcSubjectAverage, classifyGrade } from "../utils/gradeCalculator.js";

export const gradeService = {
  async getGrades({ lopId = "", monhocId = "", hocky = 1 } = {}) {
    if (USE_MOCK) {
      return mockStore.grades.filter(
        (g) =>
          (!lopId || String(g.lopId) === String(lopId)) &&
          (!monhocId || String(g.monhocId) === String(monhocId)) &&
          String(g.hocky) === String(hocky)
      );
    }
    const params = new URLSearchParams({ lopId, monhocId, hocky });
    return requestApi(`/grades?${params.toString()}`);
  },

  async getByStudent(hocsinhId, hocky = 1) {
    if (USE_MOCK) {
      return mockStore.grades.filter(
        (g) => Number(g.hocsinhId) === Number(hocsinhId) && Number(g.hocky) === Number(hocky)
      );
    }
    return requestApi(`/grades/student/${hocsinhId}?hocky=${hocky}`);
  },

  async saveBatch(rows) {
    if (USE_MOCK) {
      const passThreshold = mockStore.rules.diemDatMon || 5.0;
      mockStore.grades = mockStore.grades.map((g) => {
        const updated = rows.find(
          (r) =>
            Number(r.hocsinhId) === Number(g.hocsinhId) &&
            Number(r.monhocId) === Number(g.monhocId) &&
            Number(r.hocky) === Number(g.hocky)
        );
        if (!updated) return g;
        const avg = calcSubjectAverage(updated.thuongXuyen, updated.giuaKy, updated.cuoiKy);
        return {
          ...g,
          ...updated,
          diemTrungBinh: avg,
          xepLoai: classifyGrade(avg),
          dat: avg !== null && avg >= passThreshold,
        };
      });
      return rows.map((r) =>
        mockStore.grades.find(
          (g) =>
            Number(g.hocsinhId) === Number(r.hocsinhId) &&
            Number(g.monhocId) === Number(r.monhocId) &&
            Number(g.hocky) === Number(r.hocky)
        )
      );
    }
    return requestApi("/grades/batch", { method: "PUT", body: JSON.stringify(rows) });
  },

  async getSubjectReport({ monhocId = "", hocky = 1 } = {}) {
    if (USE_MOCK) {
      const list = await this.getGrades({ monhocId, hocky });
      const byClass = {};
      list.forEach((item) => {
        if (!byClass[item.tenLop]) {
          byClass[item.tenLop] = { tenLop: item.tenLop, siSo: 0, soDat: 0 };
        }
        byClass[item.tenLop].siSo += 1;
        if (item.dat) byClass[item.tenLop].soDat += 1;
      });
      return Object.values(byClass).map((row) => ({
        ...row,
        tyLeDat: row.siSo ? `${Math.round((row.soDat / row.siSo) * 100)}%` : "0%",
      }));
    }
    return requestApi(`/reports/subject?monhocId=${monhocId}&hocky=${hocky}`);
  },

  async getSemesterReport({ hocky = 1 } = {}) {
    if (USE_MOCK) {
      const list = await this.getGrades({ hocky });
      const studentMap = {};
      list.forEach((g) => {
        if (!studentMap[g.hocsinhId]) {
          studentMap[g.hocsinhId] = { hoTen: g.hoTen, tenLop: g.tenLop, scores: [] };
        }
        if (g.diemTrungBinh !== null) studentMap[g.hocsinhId].scores.push(g.diemTrungBinh);
      });
      return Object.entries(studentMap).map(([id, info]) => {
        const avg = info.scores.length
          ? Number((info.scores.reduce((a, b) => a + b, 0) / info.scores.length).toFixed(1))
          : null;
        return {
          id,
          hoTen: info.hoTen,
          tenLop: info.tenLop,
          diemTbHk: avg ?? "Chưa đủ điểm",
          xepLoai: classifyGrade(avg),
        };
      });
    }
    return requestApi(`/reports/semester?hocky=${hocky}`);
  },
};
