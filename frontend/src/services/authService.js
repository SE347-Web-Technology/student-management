import { USE_MOCK, requestApi } from "./apiClient.js";
import { mockStore } from "../mocks/mockDb.js";

const USER_KEY = "currentUser";

export const authService = {
  async login(username, password) {
    if (USE_MOCK) {
      const found = mockStore.users.find(
        (u) => u.username === username.trim() && u.password === password
      );
      if (!found) {
        throw new Error(
          "Tên đăng nhập hoặc mật khẩu không đúng (gợi ý: giaovu / gv01 / hs01, mật khẩu: 123)."
        );
      }
      if (!found.isActive) {
        throw new Error("Tài khoản hiện đang bị khóa. Vui lòng liên hệ Giáo vụ.");
      }
      const sessionUser = {
        id: found.id,
        username: found.username,
        fullName: found.fullName,
        role: found.role,
        linkedId: found.linkedId,
      };
      localStorage.setItem("token", "mock-jwt-token");
      localStorage.setItem(USER_KEY, JSON.stringify(sessionUser));
      return sessionUser;
    }

    const data = await requestApi("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    localStorage.setItem("token", data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    return data.user;
  },

  async logout() {
    if (!USE_MOCK) {
      await requestApi("/auth/logout", { method: "POST" }).catch(() => {});
    }
    localStorage.removeItem("token");
    localStorage.removeItem(USER_KEY);
  },

  getCurrentUser() {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
};
