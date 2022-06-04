sout("");
sout("### Running: settings.js ###");

// classes
class Section {
    constructor(title) {
        this.title = title;
        this.toolbar;
        this.content;
    }

    setToolbar(toolbar) {
        this.toolbar = toolbar;
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
        this.tools = this.window.getElementsByClassName("tools")[0];
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

        this.tools.innerHTML = "";
        try {
            this.tools.appendChild(this.sectionsHTML[index].toolbar);
        } catch (error) {
            this.tools.innerHTML = "";
        }
        
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



















// main
let windows = document.getElementById("windows");
let openedWindow = "";

let settings = new Settings();



// section
let section1 = new Section("General");
// toolbar
section1.setToolbar();

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

section1.setContent(div);



// section
let section2 = new Section("Dock");
// toolbar
section2.setToolbar();
//content
span = document.createElement("span");
span.innerHTML = "Hai cliccato dock";
section2.setContent(span);



// section
let section3 = new Section("Advanced");
// toolbar
section3.setToolbar();
//content
span = document.createElement("span");
span.innerHTML = "Questa è la sezione advanced";
section3.setContent(span);





// add sections to settings
settings.addSection(section1);
settings.addSection(section2);
settings.addSection(section3);














settings.sections.getElementsByClassName("section")[0].click();












/*
if (DEBUG) {
    openWindow("settings");
}
*/
