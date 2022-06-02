sout("");
sout("### Running: cookies.js ###");
// global variables ******************************************
USER_OPTIONS = {};


// functions *************************************************
function loadOptions() {
    sout("Loading cookies");
    // convert cookies to javascript object
    let cookies = {};
    document.cookie.split(";").forEach(cookie => {
        let pos = cookie.indexOf("=");
        cookies[cookie.substring(0, pos)] = cookie.substring(pos + 1);
    });

    // assign USER_OPTIONS respective cookie
    try {
        USER_OPTIONS = JSON.parse(cookies.userOptions);
        sout("USER_OPTIONS loaded succesfully");
    } catch (error) {
        sout("USER_OPTIONS not found, restoring defaults");
        USER_OPTIONS = {
            "dock": {
                "folders": [
                    {
                        "name": "School",
                        "links": [
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
                    {
                        "name": "Programming",
                        "links": [
                            {
                                "url": "https://stackoverflow.com",
                                "icon": "https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico"
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
                    }
                ]
            }
        }
    }
}

function saveOptions() {
    document.cookie = "userOptions=" + JSON.stringify(USER_OPTIONS);
    sout("Saved cookies");
}


// main ******************************************************
loadOptions();
