
const LIGHTMODE = {
    localStoreKey: "effyiex.lightmode",
    get active() {
        return (localStorage.getItem(this.localStoreKey) == "true");
    },
    set active(value) {
        localStorage.setItem(this.localStoreKey, value.toString());
        this.updateDOM();
    },
    updateDOM: function() {
        if(this.active) {
            if(!document.body.classList.contains("lightmode"))
            document.body.classList.add("lightmode");
        } else {
            if(document.body.classList.contains("lightmode"))
            document.body.classList.remove("lightmode");
        }
    },
    toggle: function() {
        this.active = !this.active
    }
};

window.addEventListener("load", () => {

    const menubarElem = document.querySelector(".menubar");
    const foldMenuHeadElems = menubarElem.querySelectorAll("h3");
    const foldMenuBodyElems = menubarElem.querySelectorAll(".fold-menus div");
    const controlsElem = menubarElem.querySelector(".controls");
    const lightSwitchElem = controlsElem.querySelector(".lightswitch");

    LIGHTMODE.updateDOM();
    lightSwitchElem.addEventListener("click", LIGHTMODE.toggle.bind(LIGHTMODE));

    foldMenuHeadElems.forEach((el, i) => {

        function show() {
            if(foldMenuBodyElems[i] && !foldMenuBodyElems[i].classList.contains("shown"))
            foldMenuBodyElems[i].classList.add("shown");
        }

        function hide() {
            if(foldMenuBodyElems[i] && foldMenuBodyElems[i].classList.contains("shown"))
            foldMenuBodyElems[i].classList.remove("shown");
        }

        el.addEventListener("focus", show);
        el.addEventListener("blurr", hide);
        el.addEventListener("mouseover", show);
        el.addEventListener("mouseleave", hide);

    });

});
