// Cấu hình chung gọi RESTful API & bật/tắt chế độ Mock Data
export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export async function requestApi(path, options = {}) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || `Lỗi HTTP ${res.status}`);
  }
  return res.status === 204 ? null : res.json();
}
