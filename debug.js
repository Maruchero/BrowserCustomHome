// variable declaration
let DEBUG = true;

// global functions
function sout(msg) {
    if (DEBUG) {
        console.log(msg);
    }
}

// first message
sout("### Debug mode is ACTIVE ###\n");