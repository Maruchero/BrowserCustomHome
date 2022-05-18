console.log(document.cookie);
let userOptions;
if (document.cookie == "") {
    userOptions = {
        "backgroundImage": "img/background.webp",
        "dock": {
            "apps-school": [
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
            "apps-programming": [
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
            ]
        },
        "dockBlank": true
    }
} else {
    userOptions = JSON.parse(document.cookie.substring(12, 100000));
    //console.log(userOptions);
}
// ****************
// on load load user options
// dock
let dock = document.getElementById("dock");
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
});
console.log("Dock completed");
// aspect
document.body.style.backgroundImage = "url(" + userOptions.backgroundImage + ")";





// TODO implement iframes











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
        add.setAttribute("onclick", "addFolder()"); // TODO add folder
        let edit = document.createElement("button");
        edit.setAttribute("class", "edit");
        edit.setAttribute("onclick", "editFolder()"); // TODO edit folder
        let remove = document.createElement("button");
        remove.setAttribute("class", "delete");
        remove.setAttribute("onclick", "removeFolder()"); // TODO remove folder
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
            appsContainer.appendChild(title);

            userOptions.dock[folder].forEach(link => { // per ogni link
                let c = document.createElement("div");
                c.setAttribute("class", "link");
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
    // save options
    document.cookie = "userOptions=" + JSON.stringify(userOptions);
}

function setBackground(path) {
    document.body.style.backgroundImage = "url(" + path + ")";
    userOptions.backgroundImage = path;
    document.cookie = "userOptions=" + JSON.stringify(userOptions);
    //console.log("Saved cookie: " + document.cookie);
}