
window.addEventListener("load", () => {
  const mediaLinks = document.querySelector(".medialinks");
  const mediaLinksToggle = mediaLinks.querySelector("button");
  mediaLinksToggle.addEventListener("click", () => {
    mediaLinks.classList.toggle("minimized");
  });
});
