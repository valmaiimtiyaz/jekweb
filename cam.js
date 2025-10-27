document.addEventListener("DOMContentLoaded", () => {
  const videoElement = document.getElementById("camera-stream");
  const captureBtn = document.getElementById("capture-btn");
  const countdownTimer = document.getElementById("countdown-timer");
  const filterOptions = document.querySelectorAll(".filter-option");
  const canvas = document.createElement("canvas");
  let stream = null;

  const totalShots = parseInt(localStorage.getItem("totalShots")) || 4; 
  let currentShot = 0;
  let photosArray = [];

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

  filterOptions.forEach((option) => {
    option.addEventListener("click", () => {
      filterOptions.forEach((opt) => opt.classList.remove("selected"));
      option.classList.add("selected");
      const filterValue = option.getAttribute("data-filter");
      videoElement.style.filter = filterValue;
    });
  });


  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function takeOnePhoto() {
    countdownTimer.textContent = "📸";
    countdownTimer.style.display = "block";

    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const context = canvas.getContext("2d");
    context.filter = videoElement.style.filter;
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/png");


    photosArray.push(dataUrl);
    localStorage.setItem("takenPhotos", JSON.stringify(photosArray));

    setTimeout(() => {
      countdownTimer.style.display = "none";
    }, 500);
  }

  async function startPhotoSession() {
    if (!stream) {
      alert("Kamera belum siap.");
      return;
    }

    captureBtn.disabled = true;
    captureBtn.textContent = "Get Ready!";

    for (currentShot = 1; currentShot <= totalShots; currentShot++) {
      captureBtn.textContent = `Shot ${currentShot} / ${totalShots}`;
      countdownTimer.style.display = "block";
      countdownTimer.textContent = "3";
      await sleep(1000);
      countdownTimer.textContent = "2";
      await sleep(1000);
      countdownTimer.textContent = "1";
      await sleep(1000);

      takeOnePhoto();

      if (currentShot < totalShots) {
        await sleep(2000);
      }
    }

    captureBtn.textContent = "Done! Redirecting...";
    await sleep(2000);

    window.location.href = "customize.html";
  }

  captureBtn.addEventListener("click", startPhotoSession);

  startCamera();
});

