const form = document.getElementById("solar-form");
const result = document.getElementById("result");

function formatVND(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const bill = Number(document.getElementById("bill").value);

  if (!bill || bill < 500000) {
    result.textContent =
      "Vui lòng nhập hóa đơn điện từ 500.000 VNĐ để có kết quả ước tính chính xác.";
    return;
  }

  const suggestedKw = Math.max(2, Math.round(bill / 600000));
  const estimatedCost = suggestedKw * 15000000;
  const monthlySaving = bill * 0.65;
  const paybackYears = (estimatedCost / (monthlySaving * 12)).toFixed(1);

  result.innerHTML = `
    <strong>Gợi ý công suất:</strong> ${suggestedKw} kWp<br>
    <strong>Chi phí dự kiến:</strong> ${formatVND(estimatedCost)}<br>
    <strong>Tiết kiệm mỗi tháng:</strong> ${formatVND(monthlySaving)}<br>
    <strong>Thời gian hoàn vốn:</strong> khoảng ${paybackYears} năm.
  `;
});
