// Mengatur halaman layout.html
const layoutCards = document.querySelectorAll(".layout-card");
const continueBtn = document.getElementById("continue-btn");

let selectedLayout = null;

// Matikan tombol continue di awal
continueBtn.style.opacity = "0.5";
continueBtn.style.pointerEvents = "none";

layoutCards.forEach((card) => {
  card.addEventListener("click", () => {
    layoutCards.forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");
    selectedLayout = card; // Simpan elemen kartu yang dipilih
    continueBtn.style.opacity = "1";
    continueBtn.style.pointerEvents = "auto";
  });
});

// INI BAGIAN PENTING YANG BERUBAH
continueBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (selectedLayout) {
    // 1. Ambil data dari kartu yang dipilih
    const layoutId = selectedLayout.dataset.layout; // misal: "layout-3"
    const shotCount = selectedLayout.dataset.shots; // misal: "4"

    // 2. Simpan di localStorage browser
    localStorage.setItem("selectedLayoutId", layoutId);
    localStorage.setItem("totalShots", shotCount);

    // 3. Bersihkan foto lama (jika ada)
    localStorage.removeItem("takenPhotos");

    // 4. Pindah ke halaman kamera
    window.location.href = "cam.html";
  }
});
