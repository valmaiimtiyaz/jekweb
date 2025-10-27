const layoutCards = document.querySelectorAll(".layout-card");
const continueBtn = document.getElementById("continue-btn");

let selectedLayout = null;

continueBtn.style.opacity = "0.5";
continueBtn.style.pointerEvents = "none";

layoutCards.forEach((card) => {
  card.addEventListener("click", () => {
    layoutCards.forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");
    selectedLayout = card; 
    continueBtn.style.opacity = "1";
    continueBtn.style.pointerEvents = "auto";
  });
});

continueBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (selectedLayout) {
    const layoutId = selectedLayout.dataset.layout; 
    const shotCount = selectedLayout.dataset.shots; 

    localStorage.setItem("selectedLayoutId", layoutId);
    localStorage.setItem("totalShots", shotCount);

    localStorage.removeItem("takenPhotos");

    window.location.href = "cam.html";
  }
});

