const timeStart = 8
const timeEnd = 18
var currentHour = moment().format("HH")
var meridiem

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
    $("<input>").attr("id", "input" + i).appendTo($("#form" + i))
    $("<button>").attr({"id":"submit" + i, "class":"saveBtn"}).appendTo($("#form" + i))
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
currentDate()
scheduleCreator()