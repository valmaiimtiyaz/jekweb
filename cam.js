document.addEventListener("DOMContentLoaded", () => {
  // --- 1. AMBIL ELEMEN & DATA ---
  const videoElement = document.getElementById("camera-stream");
  const captureBtn = document.getElementById("capture-btn");
  const countdownTimer = document.getElementById("countdown-timer");
  const filterOptions = document.querySelectorAll(".filter-option");
  const canvas = document.createElement("canvas");
  let stream = null;

  // Ambil data dari localStorage
  const totalShots = parseInt(localStorage.getItem("totalShots")) || 4; // Default 4 foto
  let currentShot = 0;
  let photosArray = []; // Array untuk menyimpan semua foto (DataURL)

  // --- 2. FUNGSI KAMERA (MASIH SAMA) ---
  async function startCamera() {
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: false,
      });
      videoElement.srcObject = stream;
    } catch (err) {
      console.error("Error mengakses kamera:", err);
      alert("Tidak bisa mengakses kamera. Pastikan kamu mengizinkannya.");
    }
  }

  // --- 3. FUNGSI FILTER (MASIH SAMA) ---
  filterOptions.forEach((option) => {
    option.addEventListener("click", () => {
      filterOptions.forEach((opt) => opt.classList.remove("selected"));
      option.classList.add("selected");
      const filterValue = option.getAttribute("data-filter");
      videoElement.style.filter = filterValue;
    });
  });

  // --- 4. LOGIKA UTAMA PENGAMBIL FOTO (BERUBAH TOTAL) ---

  // Fungsi untuk jeda (helper)
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Fungsi untuk mengambil satu foto
  function takeOnePhoto() {
    // Tampilkan "CHEESE!" atau efek kilat
    countdownTimer.textContent = "📸";
    countdownTimer.style.display = "block";

    // Logika capture (kode lama)
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const context = canvas.getContext("2d");
    context.filter = videoElement.style.filter;
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/png");

    // Simpan foto ke array
    photosArray.push(dataUrl);

    // Simpan ke localStorage (agar aman jika browser crash)
    localStorage.setItem("takenPhotos", JSON.stringify(photosArray));

    // Sembunyikan "CHEESE!"
    setTimeout(() => {
      countdownTimer.style.display = "none";
    }, 500); // Tampilkan "cheese" selama 0.5 detik
  }

  // Fungsi untuk menjalankan seluruh sesi foto
  async function startPhotoSession() {
    if (!stream) {
      alert("Kamera belum siap.");
      return;
    }

    // Matikan tombol
    captureBtn.disabled = true;
    captureBtn.textContent = "Get Ready!";

    for (currentShot = 1; currentShot <= totalShots; currentShot++) {
      // Beri tahu foto ke berapa
      captureBtn.textContent = `Shot ${currentShot} / ${totalShots}`;

      // Hitung mundur 3 detik
      countdownTimer.style.display = "block";
      countdownTimer.textContent = "3";
      await sleep(1000);
      countdownTimer.textContent = "2";
      await sleep(1000);
      countdownTimer.textContent = "1";
      await sleep(1000);

      // Ambil foto
      takeOnePhoto();

      // Jeda 2 detik sebelum foto berikutnya
      if (currentShot < totalShots) {
        await sleep(2000);
      }
    }

    // Selesai!
    captureBtn.textContent = "Done! Redirecting...";
    await sleep(2000);

    // Pindah ke halaman hasil (HALAMAN BARU!)
    window.location.href = "customize.html";
  }

  // --- 5. SAMBUNGKAN FUNGSI KE TOMBOL ---
  captureBtn.addEventListener("click", startPhotoSession);

  // --- 6. JALANKAN KAMERA ---
  startCamera();
});
