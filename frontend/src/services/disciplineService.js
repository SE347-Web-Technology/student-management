import { USE_MOCK, requestApi } from "./apiClient.js";
import { mockStore } from "../mocks/mockDb.js";

export const disciplineService = {
  async getAll({ hocsinhId = "", loai = "" } = {}) {
    if (USE_MOCK) {
      return mockStore.disciplines.filter(
        (d) =>
          (!hocsinhId || Number(d.hocsinhId) === Number(hocsinhId)) &&
          (!loai || d.loai === loai)
      );
    }
    const params = new URLSearchParams({ hocsinhId, loai });
    return requestApi(`/disciplines?${params.toString()}`);
  },

  async create(payload) {
    if (USE_MOCK) {
      const stu = mockStore.students.find((s) => Number(s.id) === Number(payload.hocsinhId));
      const cls = mockStore.classes.find((c) => Number(c.id) === Number(stu?.lopId));
      const item = {
        ...payload,
        id: Math.max(0, ...mockStore.disciplines.map((d) => d.id)) + 1,
        hoTen: stu?.hoTen || "Học sinh",
        tenLop: cls?.tenLop || "",
      };
      mockStore.disciplines.unshift(item);
      return item;
    }
    return requestApi("/disciplines", { method: "POST", body: JSON.stringify(payload) });
  },
};
