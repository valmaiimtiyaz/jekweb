document.addEventListener("DOMContentLoaded", () => {
  const layoutId = localStorage.getItem("selectedLayoutId");
  const photosJson = localStorage.getItem("takenPhotos");
  const photos = JSON.parse(photosJson || "[]"); 

  const container = document.getElementById("final-photostrip");

  if (!layoutId || photos.length === 0) {
    container.innerHTML =
      'Error: Could not find photos. <a href="layout.html">Please try again</a>.';
    return;
  }

  container.classList.add(layoutId);

  photos.forEach((photoDataUrl) => {
    const img = document.createElement("img");
    img.src = photoDataUrl;
    img.alt = "Your captured photo";
    container.appendChild(img);
  });
});

