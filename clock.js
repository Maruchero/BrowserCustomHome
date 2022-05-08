let second = document.getElementById("second-hand");
let minute = document.getElementById("minute-hand");
let hour = document.getElementById("hour-hand");

updateTime();
setInterval(() => {
    // seconds blinking using color property
    second.style.color = second.style.color == "transparent" ? "inherit" : "transparent";
    updateTime();
}, 1000);

function updateTime() {
    // get time
    let time = new Date();
    // set minute hand
    // add a zero to the minutes if it is less than 10
    minute.innerHTML = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
    // set hour hand
    // add a zero to the hours if it is less than 10
    hour.innerHTML = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
}
