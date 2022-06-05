sout("");
sout("### Running: settings.js ###");

// classes
class Section {
    constructor(title, content=null) {
        this.title = title;
        this.content = content;
    }

    setContent(content) {
        this.content = content;
    }
}

class Settings {
    constructor() {
        this.window = document.getElementById("settings");

        this.sectionsHTML = [];
        this.openedSection = document.createElement("span");

        this.sections = this.window.getElementsByClassName("sections")[0];
        this.title = this.window.getElementsByClassName("title")[0];
        this.content = this.window.getElementsByClassName("content")[0];

        this.sections.innerHTML = "";
    }

    addSection(section) {
        sout("Section: " + section.title);

        this.sectionsHTML.push(section);

        let sectionHTML = document.createElement("span");
        sectionHTML.className = "section";
        sectionHTML.innerHTML = section.title;
        sectionHTML.setAttribute("onclick", `settings.openSection(${this.sectionsHTML.length - 1})`);

        this.sections.appendChild(sectionHTML);
    }

    openSection(index) {
        this.openedSection.classList.remove("active");
        this.sections.children[index].classList.add("active");
        this.openedSection = this.sections.children[index];

        this.title.innerHTML = this.sectionsHTML[index].title;
        
        this.content.innerHTML = "";
        try {
            this.content.appendChild(this.sectionsHTML[index].content);
        } catch (error) {
            this.content.innerHTML = "";
        }
    }
}
























// functions
function openWindow(id) {
    windows.style.zIndex = "1";
    windows.style.backgroundColor = "var(--theme-background1)";
    document.getElementById(id).style.transform = "translate(-50%, -50%) scale(1)";
    openedWindow = id;
}

function closeWindow() {
    document.getElementById(openedWindow).style.transform = "translate(-50%, -50%) scale(0)";
    windows.style.backgroundColor = "transparent";
    setTimeout(() => {
        windows.style.zIndex = "-1";
    }, 500);
}




function toggleTheme(group) {
    if (USER_OPTIONS.theme[group] === "dark") {
        document.querySelector(`.${group}`).classList.remove(`${group}-dark`);
        USER_OPTIONS.theme[group] = "light";
        sout(`${group} light`);
    } else {
        document.querySelector(`.${group}`).classList.add(`${group}-dark`);
        USER_OPTIONS.theme[group] = "dark";
        sout(`${group} dark`);
    }
    saveCookies();
}


function setBackground(image) {
    document.body.style.backgroundImage = `url(${image})`;
    USER_OPTIONS.background = image;
    saveCookies();
}



let selectedId;
function settingsDockAdd() {
    // open an input to add a new link or a folder
    inputContainer.style.maxHeight = "174px";
    input1.setAttribute("placeholder", "URL");
    input2.setAttribute("placeholder", "Icon URL");
    button.innerHTML = "Add";
    button.setAttribute("onclick", "settingsDockAddConfirm()");
}



















// main
let windows = document.getElementById("windows");
let openedWindow = "";

let settings = new Settings();



// section GENERAL *****
// content
let div = document.createElement("div");
let ul = document.createElement("ul");

let span = document.createElement("span");
span.classList.add("title");
span.innerHTML = "Elements theme";  // Elements theme
ul.appendChild(span);

Object.keys(USER_OPTIONS.theme).forEach(key => {
    let theme = "";
    if (USER_OPTIONS.theme[key] === "dark") {
        theme = " checked";
    }

    let li = document.createElement("li");
    li.classList.add("theme-selector")
    
    let span = document.createElement("span");
    span.innerHTML = key;
    li.appendChild(span);

    let label = document.createElement("label");
    label.classList.add("toggle");
    label.innerHTML = `
        <input type="checkbox" class="switch-input" onclick="toggleTheme(\'${key}\')"${theme}>
        <span class="slider"></span>
    `;
    li.appendChild(label);

    ul.appendChild(li);

    if (USER_OPTIONS.theme[key] === "dark") {
        document.querySelector(`.${key}`).classList.add(`${key}-dark`);
    }
});
div.appendChild(ul);

ul = document.createElement("ul");
span = document.createElement("span");
span.classList.add("title");
span.innerHTML = "Background";  // Background
ul.appendChild(span);

li = document.createElement("li");
span = document.createElement("span");
span.innerHTML = "Background image";
li.appendChild(span);

label = document.createElement("label");
label.innerHTML = `
    <input type="text" id="imageInput" placeholder="File path" value="${USER_OPTIONS.background}">
    <input type="submit" value="Load" onclick="setBackground(imageInput.value)">
`;
document.body.style.backgroundImage = `url(${USER_OPTIONS.background})`;
li.appendChild(label);
ul.appendChild(li);
div.appendChild(ul);

let section1 = new Section("General", div);








// section DOCK *****
//content
div = document.createElement("div");
/*
toolbar = document.createElement("div");  // toolbar
toolbar.classList.add("toolbar");
toolbar.style.position = "relative";

let tool1 = document.createElement("span");
tool1.classList.add("tool");
tool1.style.backgroundImage = "var(--theme-icon-add)";
tool1.setAttribute("onclick", "settingsDockAdd()");

let tool2 = document.createElement("span");
tool2.classList.add("tool");
tool2.style.backgroundImage = "var(--theme-icon-edit)";
tool2.setAttribute("onclick", "settingsDockEdit()");

let tool3 = document.createElement("span");
tool3.classList.add("tool");
tool3.style.backgroundImage = "var(--theme-icon-delete)";
tool3.setAttribute("onclick", "settingsDockDelete()");

toolbar.appendChild(tool1);
toolbar.appendChild(tool2);
toolbar.appendChild(tool3);
div.appendChild(toolbar);
*/
let inputContainer = document.createElement("div");  // input container
inputContainer.classList.add("input-container");

let input1 = document.createElement("input");
input1.setAttribute("type", "text");
let input2 = document.createElement("input");
input2.setAttribute("type", "text");
let button = document.createElement("button");

inputContainer.appendChild(input1);
inputContainer.appendChild(input2);
inputContainer.appendChild(button);
div.appendChild(inputContainer);

let folders = document.createElement("div");  // folders
folders.style.overflowY = "scroll";

// for each folder in USER_OPTIONS.dock
for (let i = 0; i < USER_OPTIONS.dock.folders.length; i++) {
    let folder = USER_OPTIONS.dock.folders[i];

    let ul = document.createElement("ul");
    ul.classList.add("folder");

    let span = document.createElement("span");
    span.classList.add("title");
    span.innerHTML = folder.name;
    ul.appendChild(span);

    for (let j = 0; j < folder.links.length; j++) {
        let link = folder.links[j];

        let li = document.createElement("li");
        li.classList.add("link");
        li.style = `--icon: url("${link.icon}")`;
        li.innerHTML = link.url;

        ul.appendChild(li);
    }

    folders.appendChild(ul);
}

div.appendChild(folders);


let section2 = new Section("Dock", div);










// section
let section3 = new Section("Advanced");
//content
span = document.createElement("span");
span.innerHTML = "Questa è la sezione advanced";
section3.setContent(span);






// add sections to settings
settings.addSection(section1);
settings.addSection(section2);
settings.addSection(section3);

settings.openSection(0);













if (DEBUG) {
    openWindow("settings");
    settings.openSection(1);
}
