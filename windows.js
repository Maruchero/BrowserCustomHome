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

        this.titles = ["General", "Dock", "Advanced"];
        let toolbars = ["", "", ""];
        this.contents = [`
        <ul>
            <span class="title">Elements theme</span>
            <li>
                <span>Search bar</span>
                <label class="toggle">
                    <input type="checkbox" class="switch-input" onclick="toggleTheme(\'search-bar\')">
                    <span class="slider"></span>
                </label>
            </li>
            <li>
                <span>Dock</span>
                <label class="toggle">
                    <input type="checkbox" class="switch-input" onclick="toggleTheme(\'dock\')">
                    <span class="slider"></span>
                </label>
            </li>
            <li>
                <span>Settings</span>
                <label class="toggle">
                    <input type="checkbox" class="switch-input" onclick="toggleTheme(\'windows\')">
                    <span class="slider"></span>
                </label>
            </li>
        </ul>
        `, "Hai cliccato dock", "Questa è la sezione advanced"];

        this.sections.innerHTML = "";
        for (let i = 0; i < this.titles.length; i++) {
            sout("Section: " + this.titles[i]);
            let section = document.createElement("span");
            section.className = "section";
            section.innerHTML = this.titles[i];
            section.setAttribute("onclick", `openSection(this, \"${toolbars[i]}\", \`${this.contents[i]}\`)`);

            this.sections.appendChild(section);
        }
    }

    addSection(section) {
        this.sections.push(section);
    }

}

// functions
function openWindow(id) {
    windows.classList.add("windows-active");
    document.getElementById(id).style.transform = "translate(-50%, -50%) scale(1)";
    openedWindow = id;
}

function closeWindow() {
    windows.classList.remove("windows-active");
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




function toggleTheme(group) {
    if (group === "dock") {
        if (USER_OPTIONS.theme.dock === "dark") {
            document.querySelector(".dock").classList.remove("dock-dark");
            USER_OPTIONS.theme.dock = "light";
            sout("Dock light");
        } else {
            document.querySelector(".dock").classList.add("dock-dark");
            USER_OPTIONS.theme.dock = "dark";
            sout("Dock dark");
        }
    } else if (group === "search-bar") {
        if (USER_OPTIONS.theme["search-bar"] === "dark") {
            document.querySelector(".search-bar").classList.remove("search-bar-dark");
            USER_OPTIONS.theme["search-bar"] = "light";
            sout("Search bar light");
        } else {
            document.querySelector(".search-bar").classList.add("search-bar-dark");
            USER_OPTIONS.theme["search-bar"] = "dark";
            sout("Search bar dark");
        }
    } else if (group === "windows") {
        if (USER_OPTIONS.theme["windows"] === "dark") {
            document.querySelector(".windows").classList.remove("windows-dark");
            USER_OPTIONS.theme["windows"] = "light";
            sout("Windows light");
        } else {
            document.querySelector(".windows").classList.add("windows-dark");
            USER_OPTIONS.theme["windows"] = "dark";
            sout("Windows dark");
        }
    }
}






// main
let windows = document.getElementById("windows");
let openedWindow = "";
let openedSection = document.createElement("span");

let settings = new Settings();
settings.sections.getElementsByClassName("section")[0].click();


/*
if (DEBUG) {
    openWindow("settings");
}*/
