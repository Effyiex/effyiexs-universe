
window.addEventListener("load", () => {
  let mediaLinks = document.querySelector(".medialinks");
  let mediaLinksHeader = mediaLinks.querySelector("h2");
  mediaLinksHeader.addEventListener("click", () => {
    mediaLinks.classList.toggle("minimized");
  });
});
