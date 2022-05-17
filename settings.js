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
            ]
        },
        "dockBlank": true
    }
} else {
    userOptions = JSON.parse(document.cookie);
}
// on load load user options
document.body.style.backgroundImage = userOptions.backgroundImage;
let dock = document.getElementById("dock");

















// settings menu
let settings = document.getElementById("settings");
function openSettings() {
    settings.style.transform = "translate(-50%, -50%) scale(1)";
}
function closeSettings() {
    settings.style.transform = "translate(-50%, -50%) scale(0)";
}

openSettings();


// code
let container = document.getElementById("settings-content");
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
    if (group.innerHTML === "Aspect") {
        let option = document.createElement("span");
        option.setAttribute("class", "setting");
        option.innerHTML = "Background path:"
        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("onkeyup", "document.body.style.backgroundImage = \"url(\" + this.value + \")\"");
        option.appendChild(input);
        container.appendChild(option);
    }
    // save options
    document.cookie = JSON.stringify(userOptions);
}