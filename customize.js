document.addEventListener("DOMContentLoaded", () => {
  //Ambil data dari localStorage
  const layoutId = localStorage.getItem("selectedLayoutId");
  const photosJson = localStorage.getItem("takenPhotos");
  const photos = JSON.parse(photosJson || "[]"); // Ambil array fotonya

  // 2. Ambil elemen wadah di HTML
  const container = document.getElementById("final-photostrip");

  if (!layoutId || photos.length === 0) {
    container.innerHTML =
      'Error: Could not find photos. <a href="layout.html">Please try again</a>.';
    return;
  }

  // 3. 💡 KUNCI 1: Terapkan kelas layout ke wadah
  // Ini memberi tahu CSS, "Pakai gaya layout-1!"
  container.classList.add(layoutId);

  //Masukkan semua foto ke dalam wadah
  photos.forEach((photoDataUrl) => {
    const img = document.createElement("img");
    img.src = photoDataUrl;
    img.alt = "Your captured photo";
    container.appendChild(img);
  });

  // (Tombol save belum bisa download, kita abaikan dulu)
});
