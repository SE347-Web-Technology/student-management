// Hàm tính điểm trung bình môn (TX hệ số 1, GK hệ số 2, CK hệ số 3) và xếp loại học lực
export function calcSubjectAverage(thuongXuyen = [], giuaKy, cuoiKy) {
  if (
    giuaKy === null ||
    giuaKy === undefined ||
    giuaKy === "" ||
    cuoiKy === null ||
    cuoiKy === undefined ||
    cuoiKy === ""
  ) {
    return null;
  }
  const txList = (thuongXuyen || []).filter(
    (x) => x !== null && x !== undefined && x !== ""
  );
  const sumTx = txList.reduce((acc, x) => acc + Number(x), 0);
  const total = sumTx + Number(giuaKy) * 2 + Number(cuoiKy) * 3;
  const weight = txList.length + 5;
  return Number((total / weight).toFixed(1));
}

export function classifyGrade(avg) {
  if (avg === null || avg === undefined) return "Chưa đủ điểm";
  if (avg >= 8.0) return "Giỏi";
  if (avg >= 6.5) return "Khá";
  if (avg >= 5.0) return "Trung bình";
  return "Yếu";
}
