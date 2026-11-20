const matchSelect = document.getElementById("match");
const standSelect = document.querySelector("#stand");
const ticketsInput = document.getElementById("tickets");

const summaryMatch = document.getElementById("summaryMatch");
const summaryStand = document.querySelector("#summaryStand");
const summaryTickets = document.getElementById("summaryTickets");
const summaryTotal = document.getElementById("summaryTotal");
const toastEl = document.getElementById("toast");

let toastTimeout = null;

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("show");

  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }

  toastTimeout = setTimeout(() => {
    toastEl.classList.remove("show");
  }, 2500);
}

function updateBookingSummary() {
  const selectedMatch = matchSelect.options[matchSelect.selectedIndex];
  const selectedStand = standSelect.options[standSelect.selectedIndex];

  const matchValue = matchSelect.value || "Not selected";
  const standValue = standSelect.value || "Not selected";
  const quantity = Math.max(1, parseInt(ticketsInput.value, 10) || 1);

  const basePrice = Number(selectedMatch?.dataset.price || 0);
  const multiplier = Number(selectedStand?.dataset.multiplier || 0);
  const totalPrice =
    matchSelect.value && standSelect.value
      ? Math.round(basePrice * multiplier * quantity)
      : 0;

  summaryMatch.textContent = matchValue;
  summaryStand.textContent = standValue;
  summaryTickets.textContent = quantity;
  summaryTotal.textContent = totalPrice;

  showToast("Booking Summary updated!");
}

matchSelect.addEventListener("change", updateBookingSummary);
standSelect.addEventListener("change", updateBookingSummary);
ticketsInput.addEventListener("change", updateBookingSummary);
