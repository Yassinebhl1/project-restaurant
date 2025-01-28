document.getElementById("watchVideo").addEventListener("click", function (e) {
    e.preventDefault(); // Prevent the default anchor behavior
    const videoContainer = document.getElementById("videoContainer");
    videoContainer.style.display = videoContainer.style.display === "none" || videoContainer.style.display === "" ? "block" : "none";
  });