//Variables for Program
const timeStart = 9
const timeEnd = 17
var submitData = {}

/*Adds current time and date, time updates every 1 hundreths 
of a second showing passage of time */
function currentDate() {
    $("#currentDay").text(moment().format("dddd MMMM  DD, YYYY"))
    setInterval(function () {
        return $("#currentTime").text(moment().format("h:mm:ss.SS A"))
    }, 10);
}

/*Dynamically creates all the div elements 
to hold every time block, one div per time block
assigned id of div+i, i representing time block number*/
function divCreator(i) {
    return $("<div>").attr({ "class": "row time-block description ", "id": "div" + i }).appendTo($(".container"))
}

/*Dynamically creates all h2 elements housing the hours, appends to div + i, i representing hour
returns time and hour from populateTime function*/
function hourCreator(i) {
    return $("<h2>").text(populateTime(i)).attr("class", "hour col-1").appendTo($("#div" + i))
}

/*Correctly converts timing between 24 hour clock (00:00-24:00) to 12 hour
Determines the meridiem and returns the time and meridiem*/
function populateTime(i) {
    var meridiem
    if (i < 12) {
        meridiem = "AM"
    }
    else if (i >= 12) {
        meridiem = "PM"
        if (i == 24)
            meridiem = "AM"
    }
    if (i < 12) {
        if (i == 0) {
            i = 12
            return i + meridiem
        }
        return i + meridiem
    }
    if (i > 12) {
        i %= 12
        if (i == 0) {
            i = 12
        }
        return i + meridiem
    }
    return i + meridiem
}

/*Implements logic for determining time of day by checking current
timings against number at the end of the inputs ID, changes background color*/
function checkTime() {
    var currentHour = moment().format("HH")
    for (var i = timeStart; i <= timeEnd; i++) {
        if (i < currentHour) {
            $("#input" + i).removeClass("present future").addClass("past")
        } else if (i == currentHour) {
            $("#input" + i).removeClass("past future").addClass("present")
        } else if (i > currentHour) {
            $("#input" + i).removeClass("past present").addClass("future")
        }
    }
}

/*Creates input and submit button for user input of daily task

Also implements logic for determining time of day by checking current
timings against number at the end of the inputs ID, changes background color

Button given id of submit + i and input given id input + i,
i reprensting which timeblock they belong time, both appending to 
their respective div + i

Finally, loadData loads the data in the local storage at this point*/
function formCreator(i) {
    $("<input>").attr({ "id": "input" + i, "type": "text", "class": "col-9 col-md-10 textArea" }).appendTo($("#div" + i))
    $("<button>").text("Save").attr({ "type": "button", "id": "submit" + i, "class": "saveBtn clicked col-1" }).appendTo($("#div" + i))
    loadData(submitData)
    checkTime()
}
/*Interval runs checkTime every 15 seconds to update the background
color of the input based on current time*/
setInterval(function () {
    checkTime()
}, 15000);

/*Creates dynamic schedule html from functions defined above, first value
determined by timeStart(9am) ending at timeEnd(5pm) in the for loop*/
function scheduleCreator() {
    for (var i = timeStart; i <= timeEnd; i++) {
        divCreator(i)
        hourCreator(i)
        formCreator(i)
    }
}

/*Populates submitData array with the inputs IDs passing functions to the 
submitData variable, dynamically creates it based on timeStart
and timeEnd*/
function populateArray(submitData) {
    for (var i = timeStart; i <= timeEnd; i++) {
        submitData[i] = $("#input" + i)
    }
    return submitData
}

/*Saves submitData.val() into localStorage. 
Dynamically creates a dailyData + i key for each position in the timeblock
Recalls populateArray(submitdata) to make functions of $("#input"+i) 
available to the function*/
function saveData(submitData) {
    submitData = populateArray(submitData)
    for (var i = timeStart; i <= timeEnd; i++)
        localStorage.setItem("dailyData" + i, submitData[i].val())
}

/*Pulls data from localStorage and dynamically populates the 
$("#input"+i) value with the data from localstorage*/
function loadData(submitData) {
    for (var i = timeStart; i <= timeEnd; i++) {
        submitData[i] = localStorage.getItem("dailyData" + i)
        $("#input" + i).attr("value", submitData[i])
    }
}

/*Checks every button click value and populates the variable submitData[i]
with the input value*/
function onButtonClick() {
    for (var i = timeStart; i <= timeEnd; i++) {
        $("#submit" + i).on("click", function (submitData) {
            submitData[i] = $("#input" + i).val()
        });
    }
    return saveData(submitData)
}

/*Populates the page with the HTML and date,
only function called to run program*/
function startProgram() {
    currentDate()
    scheduleCreator()
    populateArray(submitData)
}

/*Starts Program*/
startProgram()

/*On click runs function that checks 
values on every input*/
$(".clicked").on("click", function (event) {
    event.preventDefault()
    onButtonClick()
})