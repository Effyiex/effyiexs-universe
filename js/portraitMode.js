
function onScalingApplyPortraitMode() {
    if(window.innerHeight > window.innerWidth) {
        if(!document.body.classList.contains("portrait"))
        document.body.classList.add("portrait");
    } else {
        if(document.body.classList.contains("portrait"))
        document.body.classList.remove("portrait");
    }
}

window.addEventListener("load", onScalingApplyPortraitMode);
window.addEventListener("resize", onScalingApplyPortraitMode);
