const timeStart = 8
const timeEnd = 18
var currentHour = moment().format("HH")
var meridiem
var submitData = {
    8: "",
    9: "",
    10: "",
    11: "",
    12: "",
    13: "",
    14: "",
    15: "",
    16: "",
    17: "",
    18: "",
}
function currentDate() {
    $("#currentDay").text(moment().format("dddd MMMM  DD, YYYY"))
    setInterval(function () {
        return $("#currentTime").text(moment().format("h:MM:ss.SS A"))
    }, 10);
}
function divCreator(i) {
    return $("<div>").attr({ "class": "time-block description", "id": "div" + i }).appendTo($(".container"))
}
function hourCreator(i, time, meridiem) {
    return $("<h2>").text(time + meridiem).attr("class", "hour").appendTo($("#div" + i))
}
function populateTime(i, time) {
    if (i < 12) {
        return time
    }
    if (i > 12) {
        time %= 12
        if (time == 0) {
            time += 1
        }
        return time
    }
    return time
}

function formCreator(i) {
    $("<form>").attr({ "class": "row", "id": "form" + i }).appendTo($("#div" + i))
    $("<input>").attr({ "id": "input" + i, "type": "text" }).appendTo($("#form" + i))
    $("<button>").text("Save").attr({ "type": "button", "id": "submit" + i, "class": "saveBtn clicked" }).appendTo($("#form" + i))
    loadData(submitData)
    if (i < currentHour) {
        $("#input" + i).attr("class", "past")
    } else if (i == currentHour) {
        $("#input" + i).attr("class", "present")
    } else if (i > currentHour) {
        $("#input" + i).attr("class", "future")
    }
}

function scheduleCreator() {
    var time = timeStart
    for (var i = timeStart; i <= timeEnd; i++) {
        time = populateTime(i, time, meridiem)
        divCreator(i)
        if (i < 12) {
            meridiem = "AM"
        }
        else if (i >= 12) {
            meridiem = "PM"
        }
        hourCreator(i, time, meridiem)
        formCreator(i)
        time++
    }
}
function populateArray(submitData) {
    for (var i = timeStart; i <= timeEnd; i++) {
        submitData[i] = $("#input" + i)
    }
    return submitData
}
function startProgram() {
    currentDate()
    scheduleCreator()
    populateArray(submitData)
}
function saveData(submitData) {
    submitData = populateArray(submitData)
    for (var i = timeStart; i <= timeEnd; i++)
        localStorage.setItem("dailyData" + i, submitData[i].val())
}
function loadData(submitData) {
    for (var i = timeStart; i <= timeEnd; i++) {
        submitData[i] = localStorage.getItem("dailyData" + i)
        $("#input" + i).attr("value", submitData[i])
    }
}
function onButtonClick() {
    for (var i = timeStart; i <= timeEnd; i++) {
        $("#submit" + i).on("click", function (submitData) {
            submitData[i] = $("#input" + i).val()
        });
    }
    return saveData(submitData)
}
startProgram()
$(".clicked").on("click", function () {
    onButtonClick()
})

