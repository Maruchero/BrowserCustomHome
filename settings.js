let userOptions;
if (document.cookie == "") {
    userOptions = {
        "backgroundImage": "img/background2.webp",
        "dock": {
            "School": [
                {
                    "url": "https://web.spaggiari.eu/home/app/default/login.php",
                    "icon": "https://web.spaggiari.eu/favicon.ico"
                },
                {
                    "url": "https://campus.marconivr.it/",
                    "icon": "https://campus.marconivr.it/pluginfile.php/3/theme_adaptable/favicon/1642784376/favicon.ico"
                },
                {
                    "url": "https://accounts.google.com/ServiceLogin/webreauth?continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F1%2F&sacu=1&passive=1209600&authuser=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin",
                    "icon": "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico"
                }
            ],
            "Programming": [
                {
                    "url": "https://stackoverflow.com/",
                    "icon": "https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196"
                },
                {
                    "url": "https://github.com/",
                    "icon": "https://github.githubassets.com/favicons/favicon.svg"
                },
                {
                    "url": "https://fonts.google.com/icons",
                    "icon": "https://www.gstatic.com/images/icons/material/apps/fonts/1x/catalog/v5/favicon.svg"
                }
            ]
        },
        "dockBlank": true
    }
} else {
    userOptions = JSON.parse(document.cookie.substring(12, 100000));
}
console.log(userOptions);
// ****************
// on load load user options
// dock
let dock = document.getElementById("dock");
let t_dropdown = document.getElementById("dropdown").getElementsByClassName("container")[0];
Object.keys(userOptions.dock).forEach(folder => { // per ogni folder
    let appsContainer = document.createElement("div");
    appsContainer.setAttribute("class", "apps-container");
    appsContainer.setAttribute("id", folder);

    userOptions.dock[folder].forEach(link => { // per ogni link
        let a = document.createElement("a");
        a.setAttribute("href", link.url);
        a.setAttribute("class", "link");
        a.style.backgroundImage = "url(" + link.icon + ")";
        console.log("Adding " + link.url);
        appsContainer.appendChild(a);
    });
    dock.appendChild(appsContainer);
    // dropdown
    let dropdownFolder = document.createElement("span");
    dropdownFolder.setAttribute("class", "option");
    dropdownFolder.setAttribute("onclick", "selectApps(this.innerHTML)");
    dropdownFolder.innerHTML = folder;
    t_dropdown.appendChild(dropdownFolder);
});
console.log("Dock completed");
// aspect
document.body.style.backgroundImage = "url(" + userOptions.backgroundImage + ")";

















// settings menu
let settings = document.getElementById("settings");
function openSettings() {
    settings.style.transform = "translate(-50%, -50%) scale(1)";
    let groups = document.getElementsByClassName("group");
    groups[0].click();
}
function closeSettings() {
    settings.style.transform = "translate(-50%, -50%) scale(0)";
}

//openSettings();


// code
let container = document.getElementById("settings-content");
let settingTitle = document.getElementById("setting-title");
var groups;
function setSettingsContent(group) {
    // remove active class from all groups
    groups = document.getElementsByClassName("group");
    for (let i = 0; i < groups.length; i++) {
        groups[i].classList.remove("active");
    }
    // set this active
    group.classList.add("active");
    // set content
    container.innerHTML = "";
    if (group.innerHTML === "Dock") {
        settingTitle.innerHTML = "Dock";
        // toolbar
        let toolbar = document.createElement("div");
        toolbar.setAttribute("class", "toolbar");
        let add = document.createElement("button");
        add.setAttribute("class", "add");
        add.setAttribute("onclick", "addDock()");
        let edit = document.createElement("button");
        edit.setAttribute("class", "edit");
        edit.setAttribute("onclick", "editDock()");
        let remove = document.createElement("button");
        remove.setAttribute("class", "delete");
        remove.setAttribute("onclick", "removeDock()");
        toolbar.appendChild(add);
        toolbar.appendChild(edit);
        toolbar.appendChild(remove);
        container.appendChild(toolbar);
        // folders
        Object.keys(userOptions.dock).forEach(folder => { // per ogni folder
            let appsContainer = document.createElement("div");
            appsContainer.setAttribute("class", "setting");
            let title = document.createElement("span");
            title.setAttribute("class", "title");
            title.innerHTML = folder;
            title.setAttribute("onclick", "select(this.parentElement)");
            appsContainer.appendChild(title);

            userOptions.dock[folder].forEach(link => { // per ogni link
                let c = document.createElement("div");
                c.setAttribute("class", "link");
                c.setAttribute("onclick", "select(this)");
                let span = document.createElement("span");
                span.setAttribute("class", "icon");
                span.style.backgroundImage = "url(" + link.icon + ")";
                c.appendChild(span);
                span = document.createElement("span");
                span.innerHTML = link.url;
                span.style.whiteSpace = "nowrap";
                span.style.width = "10px";
                c.appendChild(span);
                appsContainer.appendChild(c);
            });
            container.appendChild(appsContainer);
        });
    } else if (group.innerHTML === "Calendar") {
        settingTitle.innerHTML = "Calendar";
    } else if (group.innerHTML === "Search") {
        settingTitle.innerHTML = "Search";
    } else if (group.innerHTML === "Aspect") {
        settingTitle.innerHTML = "Aspect";
        let option = document.createElement("span");
        option.setAttribute("class", "setting");
        option.innerHTML = "Background path:"
        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("onkeyup", "setBackground(this.value)");
        option.appendChild(input);
        container.appendChild(option);
    }
}




// *********************************************************************
// DOCK FUNCTIONS ******************************************************
let bufferSelectedItem = null;
function select(selectedItem) {
    //console.log(selectedItem);
    if (bufferSelectedItem != null) {
        bufferSelectedItem.classList.remove("selected");
    }
    selectedItem.classList.add("selected");
    bufferSelectedItem = selectedItem;
}

function destroyWindows() {
    document.getElementById("windows").innerHTML = "";
}

function addDock() {
    if (bufferSelectedItem.classList.contains("setting")) {
        // add a link
        let window = document.createElement("div");
        window.classList.add("settings-window");
        window.classList.add("add-dock-settings-window");
        window.classList.add("widget");
        window.classList.add("glassmorphism");
        window.innerHTML = '<div class="inputs-dock"><span>Link</span><input type="text" id="linkInput"><br><span>Icon</span><input type="text" id="iconInput" onkeyup="previewIcon.style.backgroundImage = \'url(\' + this.value + \')\'"></div><span class="preview-icon" id="previewIcon"></span><div style="grid-row-start:2;grid-column-start:1;grid-column-end:3;margin: auto;"><span class="dock-button" onclick="addDockLink(linkInput.value, iconInput.value)">Confirm</span><span class="dock-button" onclick="destroyWindows()">Cancel</span></div>';
        // add all elements
        document.getElementById("windows").appendChild(window);
    } else if (bufferSelectedItem.classList.contains("settings-content")) {
        // add a folder
    }
}

function addDockLink(link, icon) {
    console.log(link + ", " + icon);
    // modify useroptions
    let folder = bufferSelectedItem.getElementsByClassName("title")[0];
    userOptions.dock[folder.innerHTML].push({
        url: link,
        icon: icon
    });
    console.log(userOptions.dock[folder]);
    // save cookie
    saveCookies();
    // destroy window
    destroyWindows();
    // reload page (optional)
}

function editDock() {
    
}

function removeDock() {
    
}

// ASPECT FUNCTIONS ****************************************************
function setBackground(path) {
    document.body.style.backgroundImage = "url(" + path + ")";
    userOptions.backgroundImage = path;
    saveCookies();
}










// PRIVATE FUNCTIONS ********************************************************
function saveCookies() {
    document.cookie = "userOptions=" + JSON.stringify(userOptions);
}