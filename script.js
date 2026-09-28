document.addEventListener("DOMContentLoaded", () => {

  const kissButton = document.getElementById("kissButton");
  const page1 = document.getElementById("page1");

  kissButton.addEventListener("click", () => {

    // Prevent repeated clicks
    kissButton.disabled = true;

    // Magical glow
    page1.classList.add("magic-start");

    // Wait before changing page
    setTimeout(() => {

      page1.classList.add("page-fade-out");

      // Page 2 will be added here later
      setTimeout(() => {
        console.log("Ready for Page 2");
      }, 1400);

    }, 900);

  });

});
