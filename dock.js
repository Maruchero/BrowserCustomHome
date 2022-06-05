sout("");
sout("### Running: dock.js ###");
// classes ***********************************************
// dropdown
class Dropdown {
    constructor(foldersHTML) {
        // foldersHTML are the folders in the dock
        // this.folders are the folders in the dropdown
        this.foldersHTML = foldersHTML;

        this.dropdown = document.getElementById("dropdown");
        this.dropdown.innerHTML = "";

        this.container = document.createElement("div");
        this.container.className = "container";

        this.folders = [];
        for (let i = 0; i < foldersHTML.length; i++) {
            let folder = document.createElement("span");
            folder.id = foldersHTML[i].id + "Folder";
            folder.className = "option";
            folder.innerHTML = foldersHTML[i].id;
            folder.setAttribute("onclick", "dock.dropdown.setContent(\"" + foldersHTML[i].id + "\")");
            this.folders.push(folder);
            this.container.appendChild(folder);
        }
        this.dropdown.appendChild(this.container);

        sout(this.folders)

        // Clear dropdown
        this.activeFolder = foldersHTML[0].id;

        for (let i = 1; i < foldersHTML.length; i++) {
            foldersHTML[i].style.display = "none";
        }

        this.maxH = dropdown.offsetHeight;
        this.toggleAppsDropdown();
    }

    toggleAppsDropdown() {
        if (this.dropdown.style.maxHeight === "0px") {
            this.dropdown.style.maxHeight = this.maxH + "px";
        } else {
            this.dropdown.style.maxHeight = "0px";
        }
    }

    setContent(selectedId) {
        document.getElementById(this.activeFolder).style.display = "none";
        document.getElementById(selectedId).style.display = "block";
        this.activeFolder = selectedId;
        this.toggleAppsDropdown();
    }
    /*
    getActiveFolder() {
        return document.getElementById(this.activeFolder);
    }
    */
}











// dock
class Link {
    constructor(url = "linkUrl", img = "linkImg") {
        this.url = url;
        this.img = img;
    }

    getUrl() {
        return this.url;
    }

    getImg() {
        return this.img;
    }

    setUrl(url) {
        this.url = url;
    }

    setImg(img) {
        this.img = img;
    }

    toString() {
        return `{"url": "${this.url}", "img": "${this.img}"}`;
    }

    toHTMLElement() {
        let link = document.createElement("a");
        link.href = this.url;
        link.className = "link";
        link.style.backgroundImage = `url(${this.img})`;
        return link;
    }
}











class Folder {
    constructor(name = "folderName") {
        this.name = name;
        this.links = [];
    }

    appendLink(name, url) {
        this.links.push(new Link(name, url));
    }

    appendLink(link) {
        this.links.push(link);
    }
    /*
    removeLink(name) {
        this.links.splice(this.links.indexOf(name), 1);
    }

    getLink(name) {
        for (let i = 0; i < this.links.length; i++) {
            if (this.links[i].name === name) {
                return this.links[i];
            }
        }
        return null;
    }
    */

    getName() {
        return this.name;
    }

    toString() {
        let string = `{"name":"${this.name}","links":[`;
        for (let i = 0; i < this.links.length; i++) {
            string += this.links[i].toString();
            if (i < this.links.length - 1) {
                string += ",";
            }
        }
        string += "]}";
        return string;
    }

    toHTMLElement() {
        this.linksHTML = [];

        let folder = document.createElement("div");
        folder.className = "folder";
        folder.id = this.name;
        for (let i = 0; i < this.links.length; i++) {
            let link = this.links[i].toHTMLElement();
            folder.appendChild(link);
            this.linksHTML.push(link);
        }
        return folder;
    }
}












class Dock {
    // sturcture: dock -> folder -> link -> url, img
    constructor() {
        this.folders = [];
        this.foldersHTML = [];
    }

    appendFolder(folder) {
        this.folders.push(folder);
        //this.foldersHTML.push(folder.toHTMLElement());
    }

    getFolder(name) {
        for (let i = 0; i < this.folders.length; i++) {
            if (this.folders[i].name === name) {
                return this.folders[i];
            }
        }
        return null;
    }
    /*
    refreshFolder(folder) {}

    removeAll() {}
    */
    toString() {
        let string = "[";
        for (let i = 0; i < this.folders.length; i++) {
            string += this.folders[i].toString();
            if (i < this.folders.length - 1) {
                string += ",";
            }
        }
        string += "]";
        return string;
    }

    appendToHTML() {
        // build dock
        let dock = document.getElementById("dock");
        dock.innerHTML = "";
        for (let i = 0; i < this.folders.length; i++) {
            let folder = this.folders[i].toHTMLElement();
            dock.appendChild(folder);
            this.foldersHTML.push(folder);
        }

        // update dropdown
        this.dropdown = new Dropdown(this.foldersHTML);

        // TODO pass returned folder objects to dropdown
    }
}















// main *************************************************
sout("Creating dock");
let dock = new Dock();

// cycle through links in USER_OPTIONS.dock.folders
for (let i = 0; i < USER_OPTIONS.dock.folders.length; i++) {
    let folder = new Folder(USER_OPTIONS.dock.folders[i].name);
    dock.appendFolder(folder);
    for (let j = 0; j < USER_OPTIONS.dock.folders[i].links.length; j++) {
        let link = new Link(USER_OPTIONS.dock.folders[i].links[j].url, USER_OPTIONS.dock.folders[i].links[j].icon);
        folder.appendLink(link);
    }
}

sout(JSON.parse(`{"dock":${dock.toString()}}`));

dock.appendToHTML();
