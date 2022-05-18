// get all apps-container class elements and set them to invisible
let apps = document.getElementsByClassName("apps-container");
for (let i = 1; i < apps.length; i++) {
    apps[i].style.display = "none";
}

let dropdown = document.getElementById("dropdown");
let activeId = apps[0].id; // id of actually visible group of icons

// get dropdown height and then collapse it
let maxH = dropdown.offsetHeight;
dropdown.style.maxHeight = "0px";

function toggleAppsDropdown() {
    if (dropdown.style.maxHeight === "0px") {
        dropdown.style.maxHeight = maxH + "px";
    } else {
        dropdown.style.maxHeight = "0px";
    }
}

function selectApps(id) {
    console.log(id);
    // set display none on active id
    document.getElementById(activeId).style.display = "none";
    // set display block on id
    document.getElementById(id).style.display = "block";
    // set active id to id
    activeId = id;
    // close dropdown
    dropdown.style.maxHeight = "0px";
}
