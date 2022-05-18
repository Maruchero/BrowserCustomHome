// create a new event object
var events = [];

let sampleEvent = {
    title: "Sample Event",
    content: "Lorem impsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
    start: new Date(),
    end: new Date()
};
sampleEvent.start.setHours(17, 30, 0, 0);
sampleEvent.end.setHours(19, 0, 0, 0);

events.push(sampleEvent);

var eventsContainer = document.getElementById("events-container");

for (let i = 0; i < events.length; i++) {
    // event creation
    let e = document.createElement("div");
    e.setAttribute("class", "event");
    // event name
    let eventName = document.createElement("span");
    eventName.setAttribute("class", "event-name");
    eventName.innerHTML = events[i].title;
    e.appendChild(eventName);

    // event time
    let eventTime = document.createElement("div");
    eventTime.setAttribute("class", "event-time");
    let eventTimeStart = document.createElement("span");
    eventTimeStart.setAttribute("class", "event-time-start");
    let eventTimeEnd = document.createElement("span");
    eventTimeEnd.setAttribute("class", "event-time-end");
    // put in the event time the start and end time
    eventTimeStart.innerHTML = events[i].start.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: false
    });
    eventTimeEnd.innerHTML = events[i].end.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: false
    });
    eventTime.appendChild(eventTimeStart);
    eventTime.appendChild(eventTimeEnd);
    e.appendChild(eventTime);

    // event content
    let eventDescription = document.createElement("div");
    eventDescription.setAttribute("class", "event-description");
    eventDescription.innerHTML = events[i].content;
    e.appendChild(eventDescription);

    // event options
    let eventOptions = document.createElement("div");
    eventOptions.setAttribute("class", "event-options");
    let eventOptionsEdit = document.createElement("button");
    eventOptionsEdit.setAttribute("class", "edit");
    eventOptionsEdit.setAttribute("onclick", "editEvent(self");
    let eventOptionsDelete = document.createElement("button");
    eventOptionsDelete.setAttribute("class", "delete");
    eventOptionsDelete.setAttribute("onclick", "deleteEvent(self");
    eventOptions.appendChild(eventOptionsEdit);
    eventOptions.appendChild(eventOptionsDelete);
    e.appendChild(eventOptions);
    // put the event in the events container
    eventsContainer.appendChild(e);
}







// set displayedDate to today's date
var displayedDate = new Date();


// get id month, year, day-name and day-number
var month = document.getElementById("month");
var year = document.getElementById("year");
var dayName = document.getElementById("day-name");
var dayNumber = document.getElementById("day-number");

displayDate();

// function displayDate
function displayDate() {
    // set month name to displayedDate's month
    month.innerHTML = displayedDate.toLocaleString("en-US", {
        month: "long"
    });
    // set year to displayedDate's year
    year.innerHTML = displayedDate.getFullYear();
    // set dayName to displayedDate's day name
    dayName.innerHTML = displayedDate.toLocaleString("en-US", {
        weekday: "short"
    });
    // set dayNumber to displayedDate's day number
    dayNumber.innerHTML = displayedDate.getDate();
}

function setDay(days) {
    // add to the current date the number of days
    displayedDate.setDate(displayedDate.getDate() + days);
    // display the new date
    displayDate();
}

function add() {
    
}