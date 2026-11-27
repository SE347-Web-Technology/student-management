// Các hàm kiểm tra dữ liệu biểu mẫu phía Client (tuổi 15-20, sĩ số tối đa 40, điểm số 0-10)
export function isValidScore(val) {
  if (val === "" || val === null || val === undefined) return false;
  const num = Number(val);
  return !Number.isNaN(num) && num >= 0 && num <= 10;
}

export function isValidStudentAge(birthDateStr, minAge = 15, maxAge = 20) {
  if (!birthDateStr) return false;
  const year = new Date(birthDateStr).getFullYear();
  const currentYear = new Date().getFullYear();
  const age = currentYear - year;
  return age >= minAge && age <= maxAge;
}

export function isValidEmail(email) {
  if (!email) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
