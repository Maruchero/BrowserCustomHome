sout("");
sout("### Running: settings.js ###");

// classes
/*
class Window {
    constructor(id) {
        this.windows = document.getElementById("windows");
        
        this.window = document.createElement("div");
        this.window.className = "window";
        this.window.id = id;
    }

    deleteWindow() {
        //let windowsHTML = this.windows.getElementsByClassName("window");
        this.windows.removeChild(this.window);
    }

    appendToHTML() {
        this.windows.appendChild(this.window);
    }
}
*/

class Settings {
    constructor() {
        this.window = document.getElementById("settings");

        this.sections = this.window.getElementsByClassName("sections")[0];
        this.title = this.window.getElementsByClassName("title")[0];
        this.tools = this.window.getElementsByClassName("tools")[0];
        this.content = this.window.getElementsByClassName("content")[0];

        let titles = ["General", "Dock", "Advanced"];
        let toolbars = ["", "", ""];
        let contents = ["Questo è il content di general", "Hai cliccato dock", ""];

        this.sections.innerHTML = "";
        for (let i = 0; i < titles.length; i++) {
            sout("Section: " + titles[i]);
            let section = document.createElement("span");
            section.className = "section";
            section.innerHTML = titles[i];
            section.setAttribute("onclick", `openSection(this, \"${toolbars[i]}\", \"${contents[i]}\")`);

            this.sections.appendChild(section);
        }
    }

    addSection(section) {
        this.sections.push(section);
    }

}

// functions
function openWindow(id) {
    windows.style.zIndex = "1";
    windows.style.backgroundColor = "#fff9";
    document.getElementById(id).style.transform = "translate(-50%, -50%) scale(1)";
    openedWindow = id;
}

function closeWindow() {
    windows.style.backgroundColor = "#fff0";
    document.getElementById(openedWindow).style.transform = "scale(0) translate(-50%, -50%)";
    setTimeout(() => {
        windows.style.zIndex = "-1";
    }, 500);
}

function openSection(caller, toolbar, content) {
    openedSection.classList.remove("active");
    caller.classList.add("active");
    openedSection = caller;

    settings.title.innerHTML = caller.innerHTML;
    settings.tools.innerHTML = toolbar;
    settings.content.innerHTML = content;
}

// main
let windows = document.getElementById("windows");
let openedWindow = "";
let openedSection = document.createElement("span");

let settings = new Settings();
settings.sections.getElementsByClassName("section")[0].click();
