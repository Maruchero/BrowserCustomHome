

// classes

class Settings {
    constructor(sections) {
        this.sections = sections;
    }

    appendToHTML() {
        let windows = document.getElementById("windows");
        windows.appendChild(
            <div class="window">
                <div class="container">
                    <div class="sections">

                    </div>
                    <div class="content" id="settingsContent">

                    </div>
                </div>
            </div>
        );
    }
}
