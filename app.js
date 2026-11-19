function showToast(message) {
  let toast = document.getElementById("toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.padding = "12px 18px";
    toast.style.backgroundColor = "#1d4ed8";
    toast.style.color = "#ffffff";
    toast.style.borderRadius = "6px";
    toast.style.fontFamily = "Arial, sans-serif";
    toast.style.fontSize = "14px";
    toast.style.zIndex = "1000";
    toast.style.display = "none";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  const bookButtons = document.querySelectorAll(".book-btn");
  const bookingForm = document.getElementById("bookingForm");

  bookButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      if (bookingForm) {
        bookingForm.scrollIntoView({ behavior: "smooth" });
      }
      showToast("Scrolled to the booking form!");
    });
  });

  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast("Booking submitted!");
    });
  }
});