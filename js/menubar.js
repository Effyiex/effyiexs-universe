
window.addEventListener("load", () => {
    const menubarElem = document.querySelector(".menubar");
    const foldMenuHeadElems = menubarElem.querySelectorAll("h3");
    const controlsElem = menubarElem.querySelector(".controls");
    const lightSwitchElem = controlsElem.querySelector(".lightswitch");
    lightSwitchElem.addEventListener(
        "click", 
        () => document.body.classList.toggle("lightmode")
    );
});
